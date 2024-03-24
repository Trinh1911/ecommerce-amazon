import { Button } from "react-bootstrap";
interface Props {
  style?: React.CSSProperties;
}
const ButtonComponent = ({ style }: Props) => {
  return (
    <Button style={style} className="button-shop">
      <span>Shop Now</span>
      <i className="fas fa-arrow-right "></i>
    </Button>
  );
};

export default ButtonComponent;
