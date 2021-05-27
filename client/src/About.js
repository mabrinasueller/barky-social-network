export default function About() {
    return (
        <>
            <div className="register-container-big">
                <div className="logo-container-dogs">
                    <div className="about-headline">
                        <h1>About us</h1>
                    </div>
                    <div className="dog-quote-container">
                        <cite>
                            Not all dogs are good boys -
                            <div className="spacer"></div>
                            some are good girls.
                        </cite>
                    </div>
                    <div className="dog-about-text-container">
                        <p>
                            We started <strong>Barky</strong> to connect dog
                            lovers with likeminded individuals. No matter if
                            you&#39;re tired of going on walks alone or you are
                            new to the city and are looking for people to
                            connect: You are all welcome at{" "}
                            <strong>Barky</strong>.
                        </p>
                        <p>
                            One morning, when Gregor Samsa woke from troubled
                            dreams, he found himself transformed in his bed into
                            a horrible vermin. He lay on his armour-like back,
                            and if he lifted his head a little he could see his
                            brown belly, slightly domed and divided by arches
                            into stiff sections. The bedding was hardly able to
                            cover it and seemed ready to slide off any moment.
                            His many legs, pitifully thin compared with the size
                            of the rest of him, waved about helplessly as he
                            looked. &#34;What&#39;s happened to me&#34; he
                            thought. It wasn&#39;t a dream.
                        </p>
                    </div>
                </div>
                <div className="dog-about-container">
                    <div className="dog-about-image-container">
                        <img
                            src="../dogs.jpeg"
                            alt="dogs painted with watercolors"
                            className="dog-about-image"
                        />
                    </div>
                    {/* <div className="registration-text-container"></div> */}
                </div>
            </div>
        </>
    );
}
