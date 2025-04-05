import PremiumNewsSlider from "@/components/home/PremiumNewsSlider";


export default function Home() {
	return (
		<div className="p-6 h-[100vh] object-fit"  style={{ backgroundImage: 'url("/bg-dark.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
			<h1 className="text-black text-xl font-bold mb-4 bg-white p-3 pl-4 rounded-full w-[200px] align-center justify-center">Latest From Us :</h1>
			<PremiumNewsSlider />
		</div>
	);
}
