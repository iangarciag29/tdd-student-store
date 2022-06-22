import Meta from "../../assets/img/metalogo.svg";

const Footer = () => {
    return <footer className="w-5/6 bg-gray-50 font-light text-xs sm:text-sm text-center py-7 inline-block tracking-wider absolute bottom-0">
        <p>Student Store | <a href="https://meta.com" target="_blank" rel="noreferrer"><img src={Meta} className="-mt-1 inline-flex"
                                                      alt="Meta Platforms Inc." width={60} /></a> University Engineering Track | Summer 2022.</p>
    </footer>
}

export default Footer;