export default function Root() {
  return (
    <>
      <div>
        <h1>React Router Contacts</h1>
        <div>
          <form role="search">
            <input
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div></div>
    </>
  );
}
