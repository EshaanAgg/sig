export const NavBar = () => {
  return (
    <nav className="p-6">
      <div className="flex justify-between">
        <div className="self-center">
          <p className="text-sigma-blue text-3xl font-bold">Sig</p>
          <p className="text-white text-xl font-bold">
            A simple SIGMA rule converter
          </p>
        </div>
        <a
          href="https://github.com/EshaanAgg/Sig"
          className="text-white self-center mr-4"
        >
          <i className="fab fa-github text-5xl"></i>
        </a>
      </div>
      <hr className="mt-6 h-px border-0 bg-sigma-blue" />
    </nav>
  );
};
