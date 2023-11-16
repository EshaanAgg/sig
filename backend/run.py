import os
import yaml
import base64
from flask import Flask, jsonify, render_template, request, Response

from sigma.conversion.base import Backend
from sigma.plugins import InstalledSigmaPlugins
from sigma.collection import SigmaCollection
from sigma.exceptions import SigmaError
from sigma.processing import pipeline
from sigma.processing.pipeline import ProcessingPipeline

app = Flask(__name__)
plugins = InstalledSigmaPlugins.autodiscover()
pipeline_generic = pipeline.ProcessingPipeline()
backends = plugins.backends
pipeline_resolver = plugins.get_pipeline_resolver()
pipelines = list(pipeline_resolver.list_pipelines())
pipelines_names = [p[0] for p in pipelines]


@app.route("/")
def healthCheck():
    return Response("The API is healthy and running!", status=200, mimetype="text/html")

@app.route("/options", methods=["GET"])
def getOptions():
    formats = []

    for backend in backends.keys():
        for name, description in plugins.backends[backend].formats.items():
            formats.append(
                {
                    "name": name, 
                    "description": description, 
                    "backend": backend
                }
            )

    for name, pipeline in pipelines:
        if len(pipeline.allowed_backends) > 0:
            pipeline.backends = ", ".join(pipeline.allowed_backends)
        else:
            pipeline.backends = "all"

    return jsonify({
        "backends": list(backends.keys()),
        "pipelines": pipelines_names,
        "formats": formats
    })


@app.route("/pipelines", methods=["GET"])
def getPipelines():
    return jsonify(pipelines_names)


@app.route("/convert", methods=["POST"])
def convert():
    rule = str(base64.b64decode(request.json["rule"]), "utf-8")
    
    # Check if input is valid YAML
    try:
        yaml.safe_load(rule)
    except:
        return Response(
            "YAMLError: Malformed YAML file", status=400, mimetype="text/html"
        )

    pipeline = []
    if request.json["pipeline"]:
        for p in request.json["pipeline"]:
            pipeline.append(p)

    template_pipeline = ""
    if request.json["pipelineYml"]:
        try:
            template = str(base64.b64decode(request.json["pipelineYml"]), "utf-8")
            template_pipeline = pipeline_generic.from_yaml(template)
        except:
            return Response(
                "YAMLError: Malformed Pipeline YAML", status=400, mimetype="text/html"
            )

    target = request.json["target"]
    format = request.json["format"]

    backend_class = backends[target]
    processing_pipeline = pipeline_resolver.resolve(pipeline)

    if isinstance(template_pipeline, ProcessingPipeline):
        processing_pipeline += template_pipeline
    else:
        print("No processing pipeline found")

    backend: Backend = backend_class(processing_pipeline=processing_pipeline)

    try:
        sigma_rule = SigmaCollection.from_yaml(rule)
        result = backend.convert(sigma_rule, format)
        if isinstance(result, list):
            result = result[0]
    except SigmaError as e:
        return Response(f"SigmaError: {str(e)}", status=400, mimetype="text/html")

    return result


if __name__ == "__main__":
    app.run(
        host="0.0.0.0", 
        port=int(os.environ.get("PORT", 8000))
    )
