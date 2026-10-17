import { contact } from '../data/content'
import { Button } from '../components/ui'

export default function Contact() {
  return (
    <section id="contact" data-stop data-label="Contact" className="relative flex min-h-[100svh] items-center">
      <div className="reveal mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Contact</p>
        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Let's build something.</h2>
        <p className="mt-4 text-muted">Websites, apps and AI tools. Message me on WhatsApp or email.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={contact.whatsappLink}>Chat on WhatsApp</Button>
          <Button href={`mailto:${contact.email}`} variant="ghost">Email Me</Button>
        </div>
        <div className="mt-8 flex justify-center gap-6 text-sm text-muted">
          <a className="hover:text-gold" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="hover:text-gold" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="hover:text-gold" href={contact.resume} download>Resume</a>
        </div>
      </div>
    </section>
  )
}
