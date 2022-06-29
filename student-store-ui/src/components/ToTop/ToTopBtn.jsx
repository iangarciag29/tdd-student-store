import {useState} from "react";

const ToTopBtn = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        let scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.addEventListener("scroll", toggleVisibility);

    return <button
        className={`p-4 bg-blue-900 rounded-lg text-gray-50 absolute bottom-10 right-10 shadow-md hover:bg-blue-800 ${visible ? "visible" : "invisible"}`}
        id="goToTopBtn" onClick={goToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"/>
        </svg>
    </button>
}

export default ToTopBtn;