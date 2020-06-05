import React, {PureComponent} from 'react';

import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {HEADER_ITEMS_MARGIN_LEFT_RIGHT} from '../constants/const';
import {DRAWER_MENU} from '../constants/Images';

class TouchableImage extends PureComponent {
  static defaultProps = {
    image: DRAWER_MENU,
    imageStyle: {},
  };

// checking if variable is URI or not
  checkURI = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
  }

  
  render() {
    const {image, imageStyle} = this.props;
    console.log(image, 'image')
    {console.log(this.checkURI(image))}
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.parent, imageStyle]}
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
        {this.checkURI(image) ? <Image source={{ uri : image}}  style={imageStyle} /> : 
        <Image source={image} style={imageStyle} />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: HEADER_ITEMS_MARGIN_LEFT_RIGHT,
  },
});

export default TouchableImage;
