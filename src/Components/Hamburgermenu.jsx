import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function HamburgerMenu({ isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-2.5 left-2.5 z-50 p-2 hover:opacity-70 transition-opacity"
        style={{ color: '#4B2142' }}
        aria-label="Open menu"
      >
        <Menu size={32} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="h-full w-80 shadow-2xl relative"
            style={{ backgroundColor: '#F8F4EF' }}
          >
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 p-2 hover:opacity-70 transition-opacity"
              style={{ color: '#4B2142' }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            <nav className="pt-20 px-8">
              <ul className="space-y-6">
                 <li>
                  <Link
                    to="/home"
                    onClick={closeMenu}
                    className="block text-lg font-medium transition-colors"
                    style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
                    onMouseEnter={(e) => e.target.style.color = '#8A1C2B'}
                    onMouseLeave={(e) => e.target.style.color = '#4B2142'}
                  >
                    Home
                  </Link>
                </li>

             
                  <li>
                    <Link
                      to="/add-product"
                      onClick={closeMenu}
                      className="block text-lg font-medium transition-colors"
                      style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
                      onMouseEnter={(e) => e.target.style.color = '#8A1C2B'}
                      onMouseLeave={(e) => e.target.style.color = '#4B2142'}
                    >
                      Add Product
                    </Link>
                  </li>
                

                <li>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="block text-lg font-medium transition-colors"
                    style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
                    onMouseEnter={(e) => e.target.style.color = '#8A1C2B'}
                    onMouseLeave={(e) => e.target.style.color = '#4B2142'}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={closeMenu}
          />
        </div>
      )}
    </>
  );
}
