import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";

function App() {
	return (
		<div className="flex flex-col h-screen">
			<PipelineToolbar />
			<div className="flex-1 overflow-hidden">
				<PipelineUI />
			</div>
		</div>
	);
}

export default App;
