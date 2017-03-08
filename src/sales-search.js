import React, { Component } from 'react';
import ReactDOM from 'react-dom';


//import { extend } from 'lodash';
//import './index.css';

import {
  SearchkitManager, SearchkitProvider, Searchkit,
  SearchBox, RefinementListFilter, Pagination, Hits,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters, SelectedFilters,
  InitialLoader, PaginationSelect, CheckboxFilter, TermQuery,
  Panel, ImmutableQuery, QueryString, Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar
} from 'searchkit';



const host = "https://vm-amelastic.clicksoftware.com:9200/sales_portal_index,rfp_index/";

const searchkit = new SearchkitManager(host);


//import BurgerMenu from 'react-burger-menu';
var Menu = require('react-burger-menu').slide;
//var Menu = BurgerMenu.slide;



const customQueryBuilder = (query, options) => {

  return {
    "bool": {
      "should": [
        {
          "query_string": {
            "query": query,


                "fields": ["id", "type", "body",  "description__c", "title","name","question__c","answer__c","answer_Short__c"]
          }
        }

      ]
    }
  }
}
class MovieHitsTable extends React.Component {




  render() {



    const { hits } = this.props;

    const _hits = this.props.hits;

    var count = this.props.hits.filter(function (v) { return v._score === 1 });

    var isQueryEmpty = false;

    var _wikiSpaceKey = "";

    if (count.length == this.props.hits.length) {

      isQueryEmpty = true;
      document.getElementsByClassName('sk-action-bar-row')[0].style.display = "none";
      document.getElementsByClassName('sk-pagination-navigation')[0].style.display = "none";

    }
    else {
      document.getElementsByClassName('sk-action-bar-row')[0].style.display = "block";
      document.getElementsByClassName('sk-pagination-navigation')[0].style.display = "block";

    }
    var wikiNumber = "";



    return (
      <div className="divResultList">


        {isQueryEmpty ? <span>  </span> : (

          <span>

            {this.props.hits.map(function (hit, i) {


              var _isAttach = false;
              var _isCase = false;
              var _downloads=false;

              var _caseId = "https://cases.clicksoftware.com/casesview/case?id=";

              var _attachUrl = "https://cksw.my.salesforce.com/";
              var _desc = "";


              if (hit._source.caseNumber && hit._source.type == 'case') {

                wikiNumber = hit._source.caseNumber;
                _caseId = _caseId + hit._id;
                _isCase = true;

              } else
                if (hit._source.caseNumber && hit._source.type == 'case_attachments') {

                  wikiNumber = hit._source.caseNumber;
                  _caseId = _caseId + hit._source.parentId;
                  _isAttach = true;
                  _attachUrl = "https://cksw.my.salesforce.com/" + hit._id;

                }
                else
                if ( hit._source.type == 'downloads') {

                  _downloads = true;
                  wikiNumber = "";

                }
                else {

                  wikiNumber = hit._id;

                }


         

              if (hit._source.wikiSpaceKey && (hit._source.wikiSpaceKey == 'PUBC9D' || hit._source.wikiSpaceKey == 'PUBSSUD')) {

                _desc = "(SE Documentation)";

              }else if(hit._source.caseNumber && hit._source.type == 'case_attachments'){

                  _desc="";
              }
              else if(hit._source.type == 'downloads'){

                  _desc="(Clicksoftware "+ hit._source.type + ")";
              }

              else if(hit._source.type == 'implementation_forum'){

                  _desc="(Implementation forum)";
              }
              
              else {
                _desc = "(" + hit._source.type + ") - " + wikiNumber

              }


              return <div key={i}>

                <span>
                  {hit._source.caseNumber && _isAttach ? (
                    <a href={hit._source.url} target="_blank" key={i}>
                      <h3 key={i}>Attachment in Case:  {hit._source.caseNumber} 
                     <br/>
                        {hit.highlight && hit.highlight.title ? (

                          <span>
                            {hit.highlight.title.map(function (_highlight, j) {

                              return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                            })}

                          </span>)
                          : <span>{hit._source.title}</span>}
                      </h3>
                     ({hit._source.name})
                      <span className="spanTypeResult">{_desc}</span>
                    </a>
                  ) : (

                      <a href={hit._source.url} target="_blank" key={i}>
                        <h3 key={i}>
                          {hit.highlight && hit.highlight.title ? (

                            <span>
                              {hit.highlight.title.map(function (_highlight, j) {

                                return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                              })}

                            </span>)
                            : <span>{hit._source.title}</span>}
                        </h3>
                        <span className="spanTypeResult">{_desc}</span>
                      </a>

                    )}
                </span>

                <div>
                  {hit.highlight && hit.highlight.body ? (

                    <span>
                      {hit.highlight.body.map(function (_highlight, j) {

                        return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>
              
           
                 <div>
                  {hit.highlight && hit.highlight['name'] ? (

                    <span>
                      {hit.highlight['name'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>
            
                <div>


                  {hit.highlight  && hit.highlight['description__c'] ? (

                     <span>
                      {hit.highlight['description__c'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>  
                       </span>)}
                </div>
                     <div>


                  {hit.highlight  && hit.highlight['answer_Short__c'] ? (

                     <span>
                      {hit.highlight['answer_Short__c'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>  
                       </span>)}
                </div>
                     <div>


                  {hit.highlight  && hit.highlight['question__c'] ? (

                     <span>
                      {hit.highlight['question__c'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>  
                       </span>)}
                </div>
                <br />
              </div>
                ;
            })}

          </span>
        )}
      </div>
    );
  }

}


class ScrollButton extends React.Component {
  constructor() {
    super();

    this.state = {
        intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  
  render () {
      return <a title='Back to top' id="back-to-top"
               onClick={ () => { this.scrollToTop(); }}>
                
              </a>;
   }
} 

class ScrollApp extends React.Component {
  constructor() {
    super();
  }
  
  render () {
    return <div>
              <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
           </div>
  }
}
/*
 * Render the ScrollApp component into the div with the id 'app'
 */
ReactDOM.render(<ScrollApp/>, document.getElementById('app'));



class App extends Component {
  render() {
    return (

     <SearchkitProvider searchkit={searchkit}>
    <Layout>
      <TopBar>

        <SearchBox

          placeholder="Search here ..."
          autofocus={true} queryBuilder={customQueryBuilder}
          searchOnChange={false}
             prefixQueryFields={["id", "type", "body", "title", "name" ,"Name", "description__c","question__c","answer__c","answer_Short__c"]} 
             />
         
      </TopBar>
      <LayoutBody>

   <Menu left isOpen={false}  >

		  
          <a className="helpLink" target="_blank" href="https://wiki.clicksoftware.com/display/IWI/Elastic+Search+Syntax+Help">Help</a>
<br/>
        
<RefinementListFilter
            id="typeId"
            title="Types"
            field="type.keyword"
            operator="OR"
            size={10} />

          <RefinementListFilter
            id="content_Position_ID"
            title="Content Position"
            field="content_Position.keyword"
            operator="OR"
            size={10} />

        </Menu>
        <LayoutResults>

          <div className="divLogoClass"><img id="logo" src="./logo.png" /></div>
          <ActionBar>

            <ActionBarRow>

              <HitsStats />
            </ActionBarRow>

            <ActionBarRow>
              <GroupedSelectedFilters />
              <ResetFilters />
            </ActionBarRow>

          </ActionBar>

          <Pagination className={"testClass"} showNumbers={true} />

          <div>

             <Hits hitsPerPage={10} highlightFields={["title", "body", "description__c", "name","question__c","answer_Short__c"]}
              sourceFilter={["title","name", "url", "body", "id", "type","description__c","question__c","answer__c","answer_Short__c"]}
              listComponent={MovieHitsTable}
            />


          </div>
		  <Pagination className={"testClass"} showNumbers={true} />
          <NoHits />

        </LayoutResults>
      </LayoutBody>
    </Layout>
  </SearchkitProvider>


    );
  }
}

export default App;
