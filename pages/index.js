import {gql} from "@apollo/client";
import client from "../appolo-client";
import {format} from "date-fns";

const Home = (props) => {
  const {books} = props;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gridGap: '25px',
      padding: '50px 25px'
    }}>
      {books.map((el, _i) => (
        <div key={_i} style={{
          color: el.textColor.css,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#999999',
          borderRadius: '5px'
        }}>
          <div style={{display: 'flex', justifyContent: 'center', padding: '20px 0'}}>
            {el.name}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', padding: '5px 0 25px 0'}}>
            {el.description}
          </div>
          <div style={{
            fontSize: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0 5px 10px 0',
            backgroundColor: 'black',
            color: 'white'
          }}>
            {format(new Date(el.createdAt), 'dd/MM/yyyy hh-mm')}
          </div>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(props) {
  const {locale} = props;
  const {data} = await client.query({
      query: gql`
      query Book {
        books(locales: [${locale}]) {
          name,
          createdAt,
          description,
          locale,
           textColor {
            css
            }
        }
      }
    `,
      fetchPolicy: 'network-only'
    },
  );

  return {
    props: {
      books: data.books
    }
  }
}

export default Home;
