export default function Copyright() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="text-center mt-10 animate">
            <p className="text-xs"><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="underline">CC BY-NC-SA4.0</a> {currentYear} &copy; Ammar | <a href="privacy" className="underline">Privacy Police</a> | <a href="disclaimer" className="underline">Disclaimer</a> | <a href="https://status.ammaricano.my.id" className="underline">Status</a></p><p className="text-xs">Produdly Created by <a href="https://ammaricano.my.id" className="underline">ammaricano</a> and Powered by <a href="https://nexjs.org" className="underline">NextJS</a>
            </p>
        </div>
    )
}
