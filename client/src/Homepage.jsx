

function HomePage() {
  function handleChange(event){
    setFile(event.target.files[0])
  }
  return (
    <>
      <div>ResumAI</div>
      <form>
        <input type="file" onChange={handleChange}/>
      </form>
      
    </>
  )
}

export default HomePage;