import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { api, TreeViewItem}  from "../../services";
import './Browse.css';

const orderStates = ['asc', 'desc', 'as is'];

function Browse() {
  const [data, setData] = useState<TreeViewItem[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>('_');
  const [loginRequestStatus, setLoginRequestStatus] = useState('loading');
  const [childrenNames, setChildrenNames] = useState<string[]>([]);
  const [orderIndex, setOrderIndex] = useState<number>(2);
  const [filterStr, setFilterStr] = useState<string>('');

  const orderToggler = useCallback(()=> {
    let newIndex = orderIndex + 1;
    console.log(newIndex, newIndex%orderStates.length);
    setOrderIndex(newIndex%orderStates.length);
  }, [orderIndex])

  useEffect(() => {
    setLoginRequestStatus('loading');
    api.getData().then((res)=>{
      setData(res.data as TreeViewItem[]);
      setLoginRequestStatus('success');
    })
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedKey(event.target.value);
  };

  const TreeView = useCallback((items: TreeViewItem[], maxCount = 0, count = 0) => {
    count++;
    return (
      <ul>
        {items.map((item: TreeViewItem) => {
          const isActive = selectedKey === item.key;
          return(
            <li key={item.key}>
              <input type="radio" name="radio-group" value={item.key} checked={isActive} onChange={handleChange}/>
              <label className={isActive ? 'label-active' : 'label'}>{item.name}</label>
              {item.children && maxCount > 0 && count < maxCount && (
                TreeView(item.children, maxCount, count)
              )}
            </li>
          )}
        )}
      </ul>
    );
  }, [selectedKey]);

  const searchChildren = useCallback((data: TreeViewItem[], searchTerm: string): string[] => {
    let result:string[] = [];
  
    for (const item of data) {
      if (item.key === searchTerm) {
        if (item.children) {
          result = item.children.map((child) => (child.name));
        }
        break;
      }
  
      if (item.children) {
        result = searchChildren(item.children, searchTerm);
      }
    }
    return result;
  }, [data]);

  // Left side names active logic
  useEffect(() => {
    let names = searchChildren(data, selectedKey);
    if (orderStates[orderIndex] === 'asc') {
      names = names.sort((a: string, b: string) => a.localeCompare(b));
    }
    if (orderStates[orderIndex] === 'desc') {
      names = names.sort((a: string, b: string) => b.localeCompare(a));
    }

    if (filterStr.length) {
      names = names.filter(item => item.includes(filterStr));
    }

    setChildrenNames(names);
  }, [data, selectedKey, orderIndex, filterStr]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterStr(event.target.value);
  };

  const ListView = useCallback(() => {
    if (!childrenNames.length) {
      return null;
    }

    return (
      <ol>
        {childrenNames.map((name, i) => {
          return(
            <li key={name + String(i)}>{name}</li>
          )}
        )}
      </ol>
    )
  }, [childrenNames])

  const render = () => {
    return (
      <table width="100%">
        <tr>
          <td width="50%" valign="top">
            <h2>Left side</h2>
            {TreeView(data, 2)}
          </td>
          <td width="50%" valign="top">
            <h2>Right side</h2>
            <input placeholder='search' type="text" onChange={handleInputChange} />
            <button onClick={()=>orderToggler()}>{orderStates[orderIndex]} order</button>
            {ListView()}
          </td>
        </tr>
      </table>
    )
  }

  return (
    <div>
      <h1>Browse</h1>
      {loginRequestStatus === 'loading' ? 'Loading...' : render()}
    </div>
  )
}

export default Browse;
