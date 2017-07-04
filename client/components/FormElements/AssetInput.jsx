import React from 'react';
import Formsy from 'formsy-react';

import AssetActions from '../../actions/AssetActions';

const FormsyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);

    const description = event.currentTarget.value;
    const data = event.currentTarget.name.split('-');
    const assetId = data[1];

    let descType = null;
    if(data[0] == 'assetShDesc') {
      descType = "shortDescription";
    } else if (data[0] == 'assetLnDesc') {
      descType = "longDescription";
    }

    AssetActions.changeAssetDescription(description, descType, assetId);
  },
  
  componentWillMount() {
    this.setValue(this.props.value);
  },

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        className="form-control"
        value={this.getValue()}
        onChange={this.changeValue}
        placeholder="must not be empty"
      />
    );
  }
});

export default FormsyInput;