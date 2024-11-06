import ResumeUpload from "./components/ResumeUpload";
import Navbar from "./components/Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      <h1>ResumAI</h1>
      <h2>Upload your resume here:</h2>
      <ResumeUpload />
    </>
  );
}

export default HomePage;
