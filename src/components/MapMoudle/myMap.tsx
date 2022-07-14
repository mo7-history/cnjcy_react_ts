/*
 * @LastEditors: Mark
 * @Description: In User Settings Edit
 * @Author: Mark
 * @Date: 2019-05-05 10:25:14
 * @LastEditTime: 2019-06-21 13:46:01
 */

import React from 'react';
import styles from './index.module.scss';
import './qqMaps.scss';

import { html_fs } from '@/config/constants';

const qqMaps = (window as any).qq.maps;
let MapObj: any = null;

let searchService: any = null;
let markers: any = [];

interface Props {
  onChange: (any) => void;
  className?: any;
  style?: any;
}

class UpLoadFile extends React.Component<Props, object> {
  state = {
    nowAddress: {},
    searchList: [],
    ListBoxH: 0,
    pageType: 'map', //search || map
    inputValue: '',
  };

  timeOut: any = null;

  onChange = () => {
    const { onChange } = this.props as any;
    const { searchList } = this.state;
    let address = {};
    if (searchList.length) {
      for (let i = 0; i < searchList.length; i++) {
        const el = searchList[i] as any;
        if (el.select === 1) {
          address = el;
          break;
        }
      }
    }
    onChange(address);
  };
  setStyle = () => {
    const mayBox: any = document.getElementById('mayBox');
    const inputBox: any = document.getElementById('inputBox');
    const qqMaps: any = document.getElementById('qqMaps');

    const mayBoxH: number = mayBox.offsetHeight;
    const inputBoxH: number = inputBox.offsetHeight;
    const qqMapsH: number = qqMaps.offsetHeight;
    const H: number = mayBoxH - inputBoxH - qqMapsH;
    const R: number = parseInt(html_fs as any, 10);
    this.setState({
      ListBoxH: H / R,
    });
  };
  componentDidMount() {
    this.setStyle();

    this.loadMap();
    if (MapObj) {
      this.setNowAddress();
      this.Search();
      this.searchKeyword();
    }
  }
  loadMap = () => {
    const LatLng = new qqMaps.LatLng(31.230416, 121.473701);
    MapObj = new qqMaps.Map(document.getElementById('qqMaps'), {
      center: LatLng,
      zoom: 15,
    });
  };
  setNowAddress = () => {
    const _this = this;
    const citylocation = new qqMaps.CityService({
      map: MapObj,
      complete(result) {
        _this.setState({
          nowAddress: result.detail,
        });
        MapObj.setCenter(result.detail.latLng);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const marker = new qqMaps.Marker({
          position: result.detail.latLng,
          map: MapObj,
        });
      },
    });
    citylocation.searchLocalCity();
  };

  Search = () => {
    const _this = this;
    let latlngBounds = new qqMaps.LatLngBounds();

    //设置Poi检索服务，用于本地检索、周边检索
    searchService = new qqMaps.SearchService({
      //设置搜索范围为北京
      location: '上海',
      //设置搜索页码为1
      pageIndex: 1,
      //设置每页的结果数为5
      pageCapacity: 40,
      //设置展现查询结构到infoDIV上
      // panel: document.getElementById('infoDiv'),
      //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
      autoExtend: true,
      //检索成功的回调函数
      complete(results) {
        //设置回调函数参数
        let pois = results.detail.pois;
        if (pois && pois.length > 0) {
          pois[0].select = 1;
        }
        _this.setState({
          searchList: pois,
        });
        for (let i = 0, l = pois.length; i < l; i++) {
          let poi = pois[i];
          //扩展边界范围，用来包含搜索到的Poi点
          latlngBounds.extend(poi.latLng);
          let marker: any = new qqMaps.Marker({
            map: MapObj,
            position: poi.latLng,
          });
          marker.setTitle(i + 1);
          markers.push(marker);
        }
        MapObj.fitBounds(latlngBounds);
      },
      //若服务请求失败，则运行以下函数
      error() {
        // alert('出错了。');
        _this.setState({
          searchList: [],
        });
      },
    });
  };

  searchKeyword(Keyword: string = '附近') {
    clearOverlays(markers);
    if (Keyword) {
      searchService.search(Keyword);
    }
    function clearOverlays(overlays) {
      let overlay;
      while ((overlay = overlays.pop())) {
        overlay.setMap(null);
      }
    }
  }
  selectAddress = (index) => {
    const { searchList } = this.state;
    const list: { select: number }[] = [];
    for (let i = 0; i < searchList.length; i++) {
      const el = searchList[i] as {};
      const obj = {
        ...el,
        select: 0,
      };
      list.push(obj);
    }
    list[index].select = 1;
    this.setState({
      searchList: list,
    });
  };

  inputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({
      inputValue: e.target.value,
    });
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.searchKeyword(inputValue);
    }, 200);
  };

  switchToSearch = () => {
    this.setState(
      {
        pageType: 'search',
      },
      () => {
        this.setStyle();
      }
    );
  };

  cancelFun = () => {
    this.setState(
      {
        pageType: 'map',
      },
      () => {
        this.setStyle();
      }
    );
    this.searchKeyword();
  };

  render() {
    const { nowAddress, searchList, ListBoxH, pageType, inputValue } = this
      .state as any;
    return (
      <div
        className={`${styles.wrapper} ${this.props.className}`}
        style={this.props.style}
      >
        <div className={styles.content} id="mayBox">
          <div className={`${styles.mapPage} ${styles[pageType]}`}>
            <div className={styles.inputBox} id="inputBox">
              <div className={styles.input} onClick={this.switchToSearch}>
                <img
                  className={styles.icon}
                  alt=""
                  src={require('./img/search.png')}
                />
                搜索地点
              </div>
              <div className={styles.searchInputBox}>
                <img
                  className={styles.icon}
                  alt=""
                  src={require('./img/search.png')}
                />
                <input
                  placeholder="搜索地点"
                  className={styles.import}
                  value={inputValue}
                  onChange={this.inputChange}
                />
              </div>
              <div className={styles.cancel} onClick={this.cancelFun}>
                取消
              </div>
            </div>
            <div className={styles.qqMaps} id="qqMaps" />
            <div className={styles.List} style={{ height: `${ListBoxH}rem` }}>
              <div className={`${styles.Item} ${styles.MyAddress}`}>
                <div className={styles.name}>我的位置</div>
                <div className={styles.address}>{nowAddress.name}</div>
              </div>
              {searchList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.Item}
                    onClick={() => {
                      return this.selectAddress(index);
                    }}
                  >
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.address}>{item.address}</div>
                    {item.select === 1 ? (
                      <img
                        className={styles.selectIcon}
                        alt=""
                        src={require('./img/select.png')}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className={styles.footer}>
              <div className={styles.Btn} onClick={this.onChange}>
                确定
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpLoadFile;
