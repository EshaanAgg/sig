export const NavBar = () => {
  return (
    <nav className="p-6 pb-0">
      <div className="flex justify-between">
        <div className="self-center">
          <p className="text-5xl font-extrabold leading-none tracking-tight text-gray-900 pb-2">
            Sig
          </p>
          <p className="text-xl font-bold leading-none tracking-tight text-gray-900">
            A simple SIGMA rule converter
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
