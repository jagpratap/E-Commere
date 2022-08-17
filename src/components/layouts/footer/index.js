const Footer = () => (
  <footer className="bg-gray-300 min-h-[10vh]">
    <div className="sm:flex justify-between sm:container mx-auto py-8">
      <div className="sm:text-start text-center">
        <h3 className="text-2xl font-semibold mb-2">
          Company
          <span className="text-blue-500">logo</span>
        </h3>
        <ul className="flex justify-center gap-2 font-semibold mb-1 ">
          <li>Home</li>
          ·
          <li>About</li>
          ·
          <li>Faq</li>
          ·
          <li>Contact</li>
        </ul>
        <p className="text-sm mb-4">Company Name © 2022</p>
        <ul className="flex sm:justify-start justify-center gap-4">
          <li><img src="./assets/images/socialLogo/Facebook.svg" alt="Facebook" className="w-6" /></li>
          <li><img src="./assets/images/socialLogo/Twitter.svg" alt="Twitter" className="w-6" /></li>
          <li><img src="./assets/images/socialLogo/Instagram.svg" alt="Instagram" className="w-6" /></li>
          <li><img src="./assets/images/socialLogo/Github.svg" alt="Github" className="w-6" /></li>
        </ul>
      </div>
      <div className="sm:flex">
        <p className="font-semibold sm:mt-2 mt-5 text-center">Contact Us</p>
        <div className="flex flex-col gap-2 sm:pl-4 sm:w-max w-3/4 mx-auto">
          <input type="text" name="email" placeholder="Email" className="py-2 px-3 rounded" />
          <textarea name="message" placeholder="Message" className="py-2 px-3 rounded" />
          <button type="button" className="bg-gray-600 text-white font-semibold py-1 px-2 w-1/2 sm:ml-auto mx-auto sm:mx-0 rounded">Send</button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
