export class MediaComponent extends React.Component {
    render() {
      const {block, contentState} = this.props;
      const {foo} = this.props.blockProps;
      const data = contentState.getEntity(block.getEntityAt(0)).getData();
      return(
        <p>Ola Mundo</p>
      )
    }
  }