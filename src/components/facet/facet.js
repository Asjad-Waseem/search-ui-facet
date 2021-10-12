import { useEffect, useRef, useState } from "react";
import Context from './../../context'
import { useContext } from "react";
import { useHistory } from "react-router";


export default function Facet(props) {
  const fieldname = props?.field ?? 'region';
  //const [facetStateValues, setFacetStateValues] = useState({}) this will be used in parent component
  const [allFieldVals, setFiledVals] = useState([]);
  const [showFilter, setShowFilter] = useState(true)
  const [size, setSize] = useState(5);
  const [data, setData] = useState([])
  const [disabledMinus, setDisableMinus] = useState(true)
  const [disabledPlus, setDisablePlus] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [filterValue, setFilterValue] = useState("");
  const facetBody = useRef(null);
  const { facetStateValues, setFacetStateValues } = useContext(Context)
  const history = useHistory('');


  useEffect(() => {
    const mockData = (fieldname === 'region')
      ? ['Vallée du Rhône, Rhône méridional', 'Quebec, Montérégie', 'Quebec, Lanaudière', 'Friuli-Venezia Giulia, Trevenezie', 'Friuli-Venezia Giulia, Venezia Giulia', "Vallée de l'Ebre", 'California', 'Languedoc-Roussillon, Aude', 'Tuscany, Toscana', 'Provence', 'Vallée de la Bekaa', 'Vallée du Rhône, Rhône satellites', "Languedoc-Roussillon, Pays d'Oc", 'Friuli-Venezia Giulia', 'Abruzzi', 'Languedoc-Roussillon', 'Vallée de la Loire, Touraine', 'British Columbia, Okanagan Valley', 'California, North Coast', 'Ontario, Niagara Peninsula', "Vallée de la Loire, L'Anjou et le Saumurois", 'Sud-Ouest, Garonne et Lot', 'Mendoza, Valle de Uco', 'Mendoza, Mendoza', 'Bordeaux', 'Bourgogne, Côte de Beaune', 'Bourgogne, Côte Chalonnaise/Côte du Couchois', '', 'Macedoine, Drama', 'Sud-Ouest, Pyrénées/Gascogne', 'Beaujolais', 'Dealu Mare', 'Porto/Douro', 'Lazio, Lazio', 'Bourgogne, Côte de Nuits', 'Sud-Ouest, Dordogne/Bergerac', 'California, Central Coast', 'Ontario, Prince Edward County', 'Victoria, Yarra Valley', 'Trentino Alto Adige', 'Valle Central, Valle del Rapel', 'Le Plateau (Meseta)', 'Veneto, Verona / Provincia di Verona / Veronese', 'Sicily', 'Puglia, Salento', 'Oregon', 'Veneto', 'Piedmont', 'Valle Central, Valle del Maule', "L'Espagne Verte", 'Vallée du Rhône, Rhône septentrional', 'Corse', 'Bourgogne, Bourgogne', 'Mendoza, Tupungato - Valle de Tupungato', 'Centre-Ouest, Val de Loire', 'Jura', 'Languedoc-Roussillon, Côtes Catalanes', "Languedoc-Roussillon, Pays d'Hérault", 'Languedoc-Roussillon, Cévennes', 'Alsace', 'South Australia, Barossa Valley', 'Côte Méditerranéenne', 'Mendoza, Barrancas', 'Ontario, Pelee Island', 'Victoria, Mornington Peninsula', 'South Eastern Australia', 'Tasmania, Tasmania', 'Savoie et Bugey', 'Mendoza', 'South Island, Marlborough', 'Tuscany', 'Lombardy', 'Vallée du Duero', 'Puglia, Puglia', 'Aconcagua, Valle del Aconcagua', 'Calabria, Calabria', 'South Australia, McLaren Vale', 'Thracian Valley', 'Washington', 'North Island, Hawkes Bay', 'Valle Central, Valle del Maipo', 'Aconcagua, Valle de San Antonio', 'Lisboa, Lisboa', 'Vallée du Duero, Castilla y León', 'Niederösterreich', 'Western Cape, Coastal Region', 'Victoria, Strathbogie Ranges', 'Dâo E Lafôes', 'Sud-Ouest, Côtes de Gascogne', 'Veneto, Veneto', 'Umbria, Umbria', "Quebec, Cantons de l'Est", 'Sterea Ellada / Central Greece, Sterea Ellada/Centre/ile Eubee', 'Vallée de la Loire, Centre Loire', 'Friuli-Venezia Giulia, Delle Venezie', 'Setúbal Peninsula, Péninsule de Setúbal', 'Bourgogne, Chablis et Grand Auxerrois', 'Quebec, Quebec Region', 'Western Cape, Breede River Valley', 'Languedoc-Roussillon, Pyrénée-Orientale']
      : ['red', 'white', 'pink']
    const allUniqueFields = [...new Set(mockData.filter(val => val !== ''))]
    setFiledVals(allUniqueFields)
    setData(allFieldVals.slice(0, 5))
  }, [])

  useEffect(() => {
    (data.length < 5) ? setDisableMinus(true) : setDisableMinus(false);
    (data.length < allFieldVals.length) ? setDisablePlus(false) : setDisablePlus(true);
    setData(allFieldVals.slice(0, size))
  }, [size, allFieldVals])


  const handelFacetStateValues = (facetStateValues) => setFacetStateValues(facetStateValues);


  const toggleFilter = (e, tempFacetStateValues) => {
    //when toggling facet value
    // add/remove from selected facet state
    // use facetStateValues. state should be stored as follows:
    // {fieldName : ['selected', 'field', 'values']}
    // additionally,
    // generate a "query string" in the following format:
    // +AND+color:red,white
    // if no facet values are selected, this sting should be empty
    // push the generated "query string" to the browsers history
    // things to consider:
    // there can be multiple facet(s) generating string(s) in the url
    // need to be able to handle this scenario
    // consider that there may be other query parameters in the url
    // ex: ?q=potato&size=50&other=sorry
    // the generated facet string must be added in the q parameter, after the query string
    if (e.target.checked) {
      if (tempFacetStateValues[fieldname])
        //tempFacetStateValues = { ...facetStateValues, ...{ [fieldname]: [...[facetStateValues[fieldname], [true, fieldname, e.target.id]]] } }
        tempFacetStateValues[fieldname].push([true, fieldname, e.target.id])
      else
        tempFacetStateValues = { ...tempFacetStateValues, ...{ [fieldname]: [[true, fieldname, e.target.id]] } }
    }
    else {
      if (tempFacetStateValues[fieldname] && tempFacetStateValues[fieldname].length > 0) {
        var updatedFacetStateValues = tempFacetStateValues[fieldname].filter(function (value, index, arr) {
          return value[2] != e.target.id;
        });
        tempFacetStateValues = { ...tempFacetStateValues, ...{ [fieldname]: updatedFacetStateValues } }
      }
    }
    handelFacetStateValues(tempFacetStateValues)
    setQueryParam(tempFacetStateValues)

  }

  const setQueryParam = (tempFacetStateValues) => {
    console.log(tempFacetStateValues)
    if (tempFacetStateValues && Object.keys(tempFacetStateValues).length > 0) {
      var query = ""
      Object.keys(tempFacetStateValues).forEach(key => {
        query += key + ":"
        tempFacetStateValues[key].forEach(item => {
          query += item[2] + ","
        })

        query += "+AND+"
      })
      query = query.substring(0, query.length - 5);
      const searchParams = new URLSearchParams(history.location.search)
      searchParams.set('q', query);
      const updateHistory = `/${searchParams.toString()}`;
      history.push(updateHistory);
    }


  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
    facetBody.current.classList.toggle('hidden')

  }

  const searchFilter = (value) => {
    // to implement -
    // when searching in the filter box, 
    // display field input checkboxes, when selected, add to the list of data
    // items and selected in state
    setFilterValue(value)
  }

  const isChecked = (id, facetStateValues) => {
    let flag = false
    if (facetStateValues && facetStateValues[fieldname] && facetStateValues[fieldname].length > 0) {
      facetStateValues[fieldname].forEach(facet => {
        if (facet[2] == id)
          flag = true
      })
    }
    return flag
  }

  const searchedEvents = allFieldVals.filter((data) => {
    return data.toUpperCase().includes(filterValue.toUpperCase())
  })

  const showData = searchedEvents.slice(0, size)

  return (
    <div className="facet shadow-md mb-4 rounded-b-md max-w-sm">
      <div className="facet-header flex flex-row border-b-2 border-indigo-600 w-full justify-between px-4 py-1">
        <span className="mb-4">{`${fieldname.replace('_', ' ')[0].toUpperCase()}${fieldname.substring(1)}`}</span>
        <button onClick={() => { toggleCollapse() }} className="bg-transparent hover:bg-indigo-200 text-blue-700 font-semibold hover:text-white rounded-full h-6 w-6">
          {collapsed ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
        </button>

      </div>
      <div ref={facetBody}>
        <div className="facet-fields flex flex-col p-4">
          {showFilter ? (
            <input
              value={filterValue}
              placeholder={"filter…"}
              type="text"
              onChange={e => {
                searchFilter(e.target.value);
              }}

            />
          ) : null}
          {showData.map((item) => (
            <label key={item} className="flex items-center truncate">
              <input
                className="form-checkbox mr-2"
                type="checkbox"
                id={item}
                data-field={item}
                onChange={(item) => { toggleFilter(item, facetStateValues) }}
                defaultChecked={isChecked(item, facetStateValues)}
              />
              {item}
            </label>
          ))}
        </div>
        {allFieldVals.length > 5 ?
          <div className="facet-footer rounded-b-md">
            <button disabled={disabledMinus} onClick={() => setSize(size - 5)} className="w-full flex justify-center bg-indigo-200 hover:bg-indigo-500 rounded-t-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button disabled={disabledPlus} onClick={() => setSize(size + 5)} className="w-full flex justify-center bg-indigo-200 hover:bg-indigo-500 rounded-b-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          :
          null
        }
      </div>
    </div>
  )
}