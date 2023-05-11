type Filters<M> = {
    [F in keyof M]?: M[F];
  }
  
  export default Filters;
  