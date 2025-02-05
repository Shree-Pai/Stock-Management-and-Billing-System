import React, { useContext, useEffect, useRef } from 'react'
import ItemContext from '../context/itemContext';
import Item from './item';
import ReactToPrint from 'react-to-print';
import BillingItems from './billingItems';
import InvoiceContext from '../context/invoiceContext';
import InvoiceComponent from './invoiceComponent';
import AddItem from './addItems';  // Updated import name to match component name

export default function BillingMain() {
  const itemContext = useContext(ItemContext);
  const { getItems, items, backendFunc, totalPrice, itemToPurchasePerItem, totalPricePerItem } = itemContext;
  const invoiceContext = useContext(InvoiceContext);
  const { getInvoices, invoices, saveInvoiceBackend} = invoiceContext;
  const componentPrint = useRef('');
  
  useEffect(() => {
    getItems();
    getInvoices();
  }, [getItems, getInvoices]);

  const getTotalItems = async (e) => {
    const totalItemsToBuy = await backendFunc();
    if (totalItemsToBuy !== null && totalItemsToBuy.length !== 0) {
      saveInvoiceBackend(totalItemsToBuy,totalPrice);
    }else{
      alert("No items Selected!!");
    }
  }

  function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;
    
    parent
      .querySelectorAll('[aria-selected="true"]').forEach(element => {
        element.setAttribute('aria-selected', false);
        element.style.color = '#7c7c7c';
        element.style.borderBottom = 'none';
      });

    target.setAttribute('aria-selected', true);

    grandparent.parentNode
      .querySelectorAll('[role="tabpanel"]')
      .forEach(p => p.setAttribute('hidden', true));

    grandparent.parentNode
      .querySelector(`#${target.getAttribute('aria-controls')}`)
      .removeAttribute('hidden');

    if (target.getAttribute('aria-selected') === 'true') {
      target.style.color = 'black';
      target.style.borderBottom = '2px solid #4f45d3';
    }
  }

  return (
    <div className='main'>
      <div className='leftHamburgerMain'>
        <div className="leftHamburger" role="tablist" aria-label="Sample Tabs" onClick={changeTabs}>
          <button role="tab" className="leftHamburgera btn btn-primary" aria-selected="true" aria-controls="panel-1" id="tab-1" tabIndex="0" >Home</button>
        </div>
        <div className="leftHamburger" role="tablist" aria-label="Sample Tabs" onClick={changeTabs}>
          <button role="tab" className="leftHamburgera btn btn-primary" aria-selected="true" aria-controls="panel-2" id="tab-2" tabIndex="0">Show all Invoice</button>
        </div>
        <div className="leftHamburger" role="tablist" aria-label="Sample Tabs" onClick={changeTabs}>
          <button role="tab" className="leftHamburgera btn btn-primary" aria-selected="true" aria-controls="panel-3" id="tab-3" tabIndex="0">Add a Item</button>
        </div>
      </div>

      <div className="contentHome" id="panel-1" role="tabpanel" tabIndex="0" aria-labelledby="tab-1">
        <div className="itemlist">
          <div className="item">
            <table>
              <tr>
                <th className="itemName">Item</th>
                <th className="itemTotalQTY">ItemQTY</th>
                <th className='my-1 mx-2' id='itemPlusButton'></th>
                <th className='Purchase'>Item To Purchase</th>
                <th className='my-1 mx-2' id='itemMinusButton'></th>
                <th className="itemPrice">Item Price</th>
                <td className='finished'></td>
                <td className="tilde"></td>
                <th className="totalPrice">Total Price</th>
              </tr>
            </table>
            <hr />
            {items !== '' && items !== null && items.length !== 0 ? items.map((item) => {
              return <Item key={item._id} item={item} />
            }) : 'No items Found!!'}
          </div>
          <div className="totalPriceDiv">
            <div className="totalPricec"><h6>Total Price : </h6><p>{totalPrice}</p></div>
            <ReactToPrint
              trigger={() => {
                return <button className='btn btn-primary p-1 my-2 mx-3'>Make Bill &#8594;</button>
              }}
              content={() => componentPrint.current}
              documentTitle='Bill'
              pageStyle="print"
              onAfterPrint={getTotalItems}
            />
          </div>
          <div className="Bill">
            <div ref={componentPrint}>
              <table>
                <tr>
                  <th className="itemNameBill">Item Name</th>
                  <th className="itemTotalQTYBill">Item Quantity</th>
                  <th className="itemPriceBill">Purcahsing Price per unit</th>
                  <th className="totalPriceBill">Total Price per Item</th>
                </tr>
                {items !== '' && items !== null && items.length !== 0 ? items.map((item) => {
                  if (itemToPurchasePerItem[item._id]) {
                    return <BillingItems key={item._id} item={item} itemToPurchase={itemToPurchasePerItem[item._id]} totalPricePerItem={totalPricePerItem[item._id]} />
                  } else {
                    return '';
                  }
                }) : 'No items Found!!'}
              </table>
              <div className="totalPriceDivBill">
                <div className="totalPricecBill"><h6>Total Price : </h6><p>{totalPrice}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contentAllInvoice" id="panel-2" role="tabpanel" tabIndex="0" aria-labelledby="tab-2" hidden>
        <div className="invoiceList">
          {invoices.length !== 0 && invoices !== undefined ? invoices.map((invoice) => {
            return <InvoiceComponent key={invoice._id} invoice={invoice} />
          }) : "No Invoices Found!!"}
        </div>
      </div>

      <div className="contentAllInvoice" id="panel-3" role="tabpanel" tabIndex="0" aria-labelledby="tab-3" hidden>
        <AddItem />
      </div>
    </div>
  )
}