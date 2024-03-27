import Breadcrumb from 'react-bootstrap/Breadcrumb';
interface Props {
    brand: string;
    name: string;
}
const BreadcrumbComponent = ({brand, name} : Props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        {brand}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{name}</Breadcrumb.Item>
    </Breadcrumb>

  )
}

export default BreadcrumbComponent