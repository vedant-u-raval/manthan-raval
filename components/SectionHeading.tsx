import { revealDelay } from "@/lib/motion";

type Props = {
  index: string;
  label: string;
  title: string;
  id: string;
  className?: string;
};

/** Editorial section header: numbered label with a drawn rule, then a serif heading. */
export default function SectionHeading({ index, label, title, id, className = "" }: Props) {
  return (
    <div className={className}>
      <p className="eyebrow flex items-center gap-3" data-reveal="fade">
        <span className="font-serif text-base not-italic tracking-normal text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-accent/60" data-reveal="line" style={revealDelay(150)} />
        {label}
      </p>
      <h2
        id={id}
        className="mt-6 font-serif text-4xl font-medium leading-[1.06] tracking-[-0.01em] text-ink sm:text-5xl lg:text-[3.4rem]"
        data-reveal
        style={revealDelay(100)}
      >
        {title}
      </h2>
    </div>
  );
}
