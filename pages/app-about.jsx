
export function About() {
    return <section className="app-about">
        <img src="./assets/img/about.jpg" alt="" className="main-img" />
        <div>
            <h2>Who are we?</h2>
        </div>
        <div className="txt">
            <p> Our company "Appsus" Was created for one goal - Making your tech environment more comfortable.
                It was designed by our greatest web developers and took about 4 days to reach the final product.
                We are proud to introduce you an app that can hold both email and notes features.
                <div>
                    We invite you to check our company and contact us any time!
                </div>
            </p>
        </div>

        <div className="contact">
            <h1>Contact us:</h1>
            <div className="contact-icons">
                <a href="https://www.facebook.com/" target="_blank"><img src="./assets/icons/facebook.png" alt="" /></a>
                <a href="https://www.instagram.com/" target="_blank"><img src="./assets/icons/instagram.png" alt="" /></a>
                <a href="https://www.linkedin.com/" target="_blank"><img src="./assets/icons/linkedin.png" alt="" /></a>
                <a href="https://twitter.com/?lang=he" target="_blank"><img src="./assets/icons/twitter.png" alt="" /></a>
            </div>
        </div>
    </section>
}