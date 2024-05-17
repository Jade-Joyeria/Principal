document.addEventListener('DOMContentLoaded', (event) => 


function filtrarVentas() {
    const fechaInput = document.getElementById('fecha').value;
    const ventasTbody = document.getElementById('ventas-tbody');
    const rows = ventasTbody.getElementsByTagName('tr');
    let totalVentas = 0;

    for (let row of rows) {
        const rowFecha = row.getAttribute('data-fecha');
        if (rowFecha === fechaInput) {
            row.style.display = '';
            const valorVenta = parseFloat(row.cells[2].innerText.replace(/[^0-9,-]+/g, "").replace(',', '.'));
            totalVentas += valorVenta;
        } else {
            row.style.display = 'none';
        }
    }

    document.getElementById('total-ventas').innerText = totalVentas.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}





/*
    function filtrarVentas() {
        const inputFecha = document.getElementById('fecha').value;

        const filteredVentas = ventas.filter(venta => venta.fecha === inputFecha);
    
        const tbody = document.getElementById('ventas-tbody');
        tbody.innerHTML = '';
    
        let total = 0;
        filteredVentas.forEach(venta => {
            const tr = document.createElement('tr');
    
            const fechaTd = document.createElement('td');
            fechaTd.textContent = venta.fecha;
            fechaTd.classList.add('u-border-4', 'u-border-white', 'u-table-cell');
    
            const idVentaTd = document.createElement('td');
            idVentaTd.textContent = venta.id_venta;
            idVentaTd.classList.add('u-border-4', 'u-border-white', 'u-table-cell');
    
            const valorTd = document.createElement('td');
            valorTd.textContent = venta.valor;
            valorTd.classList.add('u-border-4', 'u-border-white', 'u-table-cell');
    
            tr.appendChild(fechaTd);
            tr.appendChild(idVentaTd);
            tr.appendChild(valorTd);
    
            tbody.appendChild(tr);
    
            const value = parseFloat(venta.valor.replace(/[^0-9,-]+/g, "").replace(",", "."));
            total += value;
        });
    
        total = total.
        total += value;
    };
        
        toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td class="u-border-4 u-border-white u-table-cell"></td>
            <td class="u-border-4 u-border-white u-table-cell"><strong>Total</strong></td>
            <td class="u-border-4 u-border-white u-table-cell"><strong>${total}</strong></td>
            ` ;
        tbody.appendChild(totalRow);
    
    

)
*/
)
