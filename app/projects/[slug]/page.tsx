import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import {buildRedisKey} from "@/util/redis";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	console.log(params);
	const slug = params?.slug;
	const project = allProjects.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	// const views =  await redis.get<number>(buildRedisKey(["pageviews", "projects", slug]));

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} views={0} />
			<ReportView slug={project.slug} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}
