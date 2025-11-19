import React from "react";

const About = () => {
    return (
        <div className="prose max-w-none">
            <h1>About Dragon News</h1>
            <p>
                Dragon News is a community-driven news aggregator focused on bringing
                you timely, relevant, and trustworthy stories from around the world.
                We curate reporting from a wide range of sources and present it with
                clear summaries so you can stay informed quickly.
            </p>

            <h2>Our Mission</h2>
            <p>
                We believe in accessible journalism. Our mission is to make high-
                quality information easy to find, understand, and share. We prioritize
                accuracy, context, and multiple perspectives in every story we surface.
            </p>

            <h2>What We Cover</h2>
            <ul>
                <li>Breaking national and international news</li>
                <li>Business, technology and science</li>
                <li>Local culture, sports and community stories</li>
            </ul>

            <h2>Contact</h2>
            <p>
                Questions, tips, or feedback? Email us at
                <a className="text-primary ml-1" href="mailto:hello@dragonnews.example">hello@dragonnews.example</a>
            </p>

            <h2>Join Us</h2>
            <p>
                We're always looking for contributors — reporters, editors, and
                developers. If you're interested in collaborating, let us know via
                the contact email above.
            </p>
        </div>
    );
};

export default About;
