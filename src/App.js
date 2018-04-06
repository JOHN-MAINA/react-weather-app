import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';

const API_KEY = 'YOUR_BATTUTA_API_KEY';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            regions: [],
            cities: [],
            countryCode: ''
        };

        this.countrySelected = this.countrySelected.bind(this);
        this.citySelected = this.citySelected.bind(this);
        this.regionSelected = this.regionSelected.bind(this);
        this.fetchRegions = this.fetchRegions.bind(this);
    }

    countrySelected(e) {
        this.setState({
            countryCode: e.target.value
        });

        this.fetchRegions(e.target.value);
    }

    regionSelected(e) {
        this.fetchCities(e.target.value);
    }

    citySelected (e) {
        console.log("City selected" + e.target.value);
    }

    fetchRegions(countryCode) {
        let $this = this;
        fetchJsonp('http://battuta.medunes.net/api/region/' + countryCode + '/all/?key=' + API_KEY)
            .then(function(response) {
                return response.json()
            }).then(function(regions) {
            $this.setState({
                regions: regions
            });
            console.log(regions)
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    }

    fetchCities(region) {
        let $this = this;
        fetchJsonp('http://battuta.medunes.net/api/city/'+ $this.state.countryCode +'/search/?region='+ region + '&key=' + API_KEY)
            .then(function(response) {
                return response.json()
            }).then(function(cities) {
            $this.setState({
                cities: cities
            });
            console.log(cities)
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    }

    componentDidMount () {
        let $this = this;

        fetchJsonp('http://battuta.medunes.net/api/country/all/?key=' + API_KEY)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
            $this.setState({
                countries: json
            });
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

    }

  render() {
        let countries = this.state.countries.map((country, index) => {
            return (
                <option value={country.code} key={index}>{country.name}</option>
            )
        });

        let regions = this.state.regions.map((Region, index) => {
            return(
                <option key={index}>{Region.region}</option>
            )
        });

        let cities = this.state.cities.map((city, index) => {
            return (
                <option key={index}>{city.city}</option>
            )
        });

    return (
      <div className="App container">
        <form>
            <div className="row">
                <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                        <label className="my-1 mr-2" >Select country</label>
                        <select className="custom-select my-1 mr-sm-2" onChange={this.countrySelected}>
                            <option>Choose...</option>
                            {countries}
                        </select>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                        <label className="my-1 mr-2" >Region</label>
                        <select className="custom-select my-1 mr-sm-2" onChange={this.regionSelected}>
                            <option >Choose...</option>
                            {regions}
                        </select>
                    </div>
                </div>


                <div className="form-group col-lg-4 col-md-4">
                    <label className="my-1 mr-2" >City</label>
                    <select className="custom-select my-1 mr-sm-2" onChange={this.citySelected}>
                        <option>Choose...</option>
                        {cities}
                    </select>
                </div>
            </div>
        </form>

      </div>
    );
  }
}

export default App;
