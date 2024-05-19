import Breadcrumb from "react-bootstrap/Breadcrumb";
interface Props {
  category: string;
  name?: string;
}
const BreadcrumbComponent = ({ category, name }: Props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/#">Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        {category}
      </Breadcrumb.Item>
      {name && <Breadcrumb.Item active>{name}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
