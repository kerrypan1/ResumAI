import ResumeUpload from "../components/ResumeUpload";

function HomePage() {
  return (
    <>
      <div className ='TitlePage'> 
        <div className = 'Title'>
          <h1>ResumAI</h1>
        </div>
        <h2>Upload your resume here:</h2>
        <ResumeUpload />
      </div>
    </>
  );
}

export default HomePage;
