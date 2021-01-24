import {useState, useEffect, useRef} from 'react';
import {Modal, Header, Items, Detail, Loading as LoadingIcon} from './components'
import axios from 'axios';

function App() {
  const [Visible, setVisible] = useState(false);
  const [Url, setUrl] = useState('');
  const [DataItem, setDataItem] = useState<any>([]);
  const [NextUrl, setNextUrl] = useState('');
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    function fetchData() {
      axios({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
      })
      .then(res => {
        setDataItem(res.data.results);
        setNextUrl(res.data.next);
        setLoading(false);
      })
      .catch(error => console.log(error.message))
    }
    fetchData();
  }, [])
  
  // tracking on which page we currently are
  const [Page, setPage] = useState(1);
  // add loader refrence 
  const loader: any = useRef(null);

  useEffect(() => {
       var options = {
          root: null,
          rootMargin: "20px",
          threshold: 1.0
       };
      // initialize IntersectionObserver
      // and attaching to Load More div
       const observer = new IntersectionObserver(handleObserver, options);
       if (loader.current) {
          observer.observe(loader.current)
       }

  }, [loader]);


  useEffect(() => {
      // here we simulate adding new posts to List
      function fetchData() {
        axios({
          method: 'GET',
          url: NextUrl,
        })
        .then(res => {
          const newList = DataItem.concat(res.data.results);
          setDataItem(newList);
          setLoading(false);
          setNextUrl(res.data.next);
        })
        .catch(error => console.log(error.message))
      }
      Page > 1 && fetchData();
  }, [Page])

  // here we handle what happens when user scrolls to Load More div
 // in this case we just update Page variable
  const handleObserver = (entities: any) => {
      const target = entities[0];
      if (target.isIntersecting) {   
          setPage((Page) => Page + 1)
      }
  }

  return (
    <>
      {
        !Loading ? (
          <>
            <div className="max-w-2xl rounded-md shadow-md mx-auto flex flex-col h-screen bg-gray-50">
              <Header
                imageUrl="https://www.pngrepo.com/png/276264/180/pokeball-pokemon.png"
                label="Pokedex"
              />
              <div className="overflow-y-auto">
                {
                  DataItem.map((item: any, index: number) => {
                    return (
                      <>
                        <Items 
                          key={index}
                          title={item.name} 
                          onClick={() => {
                            setUrl(item.url);
                            setVisible(!Visible);
                          }}
                        />
                      </>
                    )
                  })
                }
                <div ref={loader}>
                  <LoadingIcon size={6} />
                </div>
              </div>
            </div>
            <Modal
              visible={Visible}
              onClose={() => setVisible(!Visible)}
            >
              <Detail
                url={Url}
              />
            </Modal>
          </>
        ) : (
            <LoadingIcon size={8} />
        )
      }
    </>
  );
}

export default App;
