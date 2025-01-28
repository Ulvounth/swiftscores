import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">Swiftscores</div>

        {/* Hamburger Menu */}
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
