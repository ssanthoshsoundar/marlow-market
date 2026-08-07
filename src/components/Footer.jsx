export default function Footer() {
  return (
    <footer className="bg-[#14213D] text-white/70 text-sm mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div>
          <h4 className="text-white font-medium mb-2">Get to know us</h4>
          <ul className="space-y-1">
            <li>About Marlow</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Sell with us</h4>
          <ul className="space-y-1">
            <li>Become a seller</li>
            <li>Seller support</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Help</h4>
          <ul className="space-y-1">
            <li>Track your order</li>
            <li>Returns</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Payment</h4>
          <ul className="space-y-1">
            <li>Gift cards</li>
            <li>Payment methods</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs">
        © {new Date().getFullYear()} Marlow Market. For demo purposes only.
      </div>
    </footer>
  );
}
