type LoaderProps = {
  show: boolean,
}

const Loader = ({ show }: LoaderProps) => {
  return (
    show 
      ? <div></div>
      : null
  )
}

export default Loader;