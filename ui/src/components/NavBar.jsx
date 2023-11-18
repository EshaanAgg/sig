export const NavBar = () => {
  return (
    <nav className="p-6 pb-0">
      <div className="flex justify-between">
        <div className="self-center">
          <p className="text-5xl font-extrabold leading-none tracking-tight text-gray-900 pb-2">
            Sig
          </p>
          <p className="text-3xl font-bold leading-none tracking-tight text-gray-900 pb-2">
            A simple SIGMA rule converter
          </p>
          <p className="text-md leading-none text-gray-700 max-w-3xl">
            You can directly add your rules and pipelines in the window editor,
            and then select a backend and format to which you want to convert
            to. You can even choose additional pipelines if you want to
            configure how the conversion happens.
          </p>
        </div>
        <a href="https://github.com/EshaanAgg/Sig" className="self-center mr-4">
          <i className="fab fa-github text-5xl"></i>
        </a>
      </div>
      <hr className="mt-6 h-px border-0 bg-sigma-blue" />
    </nav>
  );
};
