import { cn } from "../lib/cn";

export default function Card({
	title,
	children,
	className,
}: {
	title?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<section
			className={cn(
				"overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
				className,
			)}
		>
			{title != null && (
				<header className="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/30">
					<h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
						{title}
					</h3>
				</header>
			)}
			<div className="px-5 py-4">{children}</div>
		</section>
	);
}
