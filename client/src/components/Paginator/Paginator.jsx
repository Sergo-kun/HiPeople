import './paginator.css'


const Paginator = () => {
    return (
        <div className='paginator'>
            <tr>
               <td className='element'>{'<'}</td>
                <td  className='element'>1</td>
                <td  className='element'>2</td>
                <td  className='element'>2</td>
                <td  className='element'>...</td>
                <td  className='element'>47</td>
                <td  className='element'>48</td>
                <td  className='element'>49</td>
                <td  className='element'>{'>'}</td>
            </tr>
        </div>
    )
}


export default Paginator