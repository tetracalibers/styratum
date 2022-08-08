import Syrm from '../../components/Syrm';

const Stack = ({
  children,
  space = '1.7rem',
  recursive = false,
  separateFrom,
  isList = false,
  ...divProps
}) => {
  return <Syrm place='./Stack.syrm' props={[space, recursive, separateFrom, isList]}>
      <div {...divProps}>{children}</div>
    </Syrm>;
};

export default Stack;