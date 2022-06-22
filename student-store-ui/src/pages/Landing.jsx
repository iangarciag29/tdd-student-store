import Products from "../components/Products/Products";
import image from "../assets/img/img1.jpg";

const Landing = () => {
    return <div>
        <section className="px-2 pt-10 mb-20 md:px-0">
            <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                <div className="flex flex-wrap items-center sm:-mx-3">
                    <div className="w-full md:w-1/2 md:px-3">
                        <div
                            className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                <span className="block xl:inline">Welcome!</span><br/>
                                <span className="block text-blue-900 xl:inline">Find your merch!</span>
                            </h1>
                            <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl text-justify">We
                                have
                                all kinds of goodies. Click on any of the items to start filling up your shopping cart.
                                Checkout whenever you're ready.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                            <img src="https://cdn.devdojo.com/images/november2020/hero-image.jpeg" alt="Hm"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <hr className="mx-36 pt-10 pb-5"/>
        <Products/>
        <section className="pt-20 pb-40 bg-gray-50">
            <div className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
                <div className="flex flex-wrap items-center -mx-3">
                    <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                        <div className="w-full lg:max-w-md">
                            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">Contact
                                us!</h2>
                            <ul>
                                <li className="flex items-center py-2 space-x-4 xl:py-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-medium text-gray-500">Email: <a
                                        href="emailto:code@path.org">code@path.org</a></span>
                                </li>
                                <li className="flex items-center py-2 space-x-4 xl:py-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                    </svg>
                                    <span
                                        className="font-medium text-gray-500">Phone: 1-800-CODEPATH</span>
                                </li>
                                <li className="flex items-center py-2 space-x-4 xl:py-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <span className="font-medium text-gray-500">Address: 123 Fake Street, san Francisco, CA.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
                        <img
                            className="mx-auto sm:max-w-sm lg:max-w-full rounded-lg shadow-lg"
                            src={image} alt="Contact us!"/>
                    </div>
                </div>
            </div>
        </section>

    </div>
}

export default Landing;