import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const name = searchParams.get('name');
		const pronunciation = searchParams.get('pronunciation');
		const meaning = searchParams.get('meaning');
		return new ImageResponse(
			(
				<div tw="flex flex-row p-12 w-full h-full bg-white">
					<div tw="flex flex-col w-[80%] m-24 h-full">
						<div tw="flex flex-row justify-between items-start">
							<h1 tw="text-6xl text-gray-600">{name}</h1>
							<h1 tw="font-thin italic text-1xl text-gray-600">
								/{pronunciation}/
							</h1>
						</div>
						<p tw="text-3xl text-neutral-700 mt-6">{meaning}</p>
						<h1 tw="flex justify-end my-44 font-thin italic text-2xl text-gray-600">
							www.zita.co.zw
						</h1>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 550,
			},
		);
	} catch (e) {
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
