const income = [
    new Income("salario", 2500000),
    new Income("Venta Carro", 25000000),
];

const egress = [
    new Egress("Arriendo", 700000),
    new Egress("Vestimenta", 150000),
]

const formattCurrency = (value) => {
    return value.toLocaleString('en-US',{style:'currency', currency: 'USD', minimumFractionDigits:2});
}

const formattPercent = (value) => {
    return value.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

const loadApp = () => {
    loadHeader();
    loadIncome();
    loadEgress();
}

const totalIncome = () => {
    total = 0;
    for(element of income) {
        total += element.value;
    }
    return total;
}


const totalEgress = () => {
    total = 0;
    for(element of egress) {
        total += element.value;
    }
    return total;
}

const loadHeader = () => {
    let budget = totalIncome() - totalEgress();
    let egressPorcent = totalEgress() / totalIncome();
    document.getElementById("presupuesto").innerHTML = formattCurrency(budget);
    document.getElementById("ingreso").innerHTML = formattCurrency(totalIncome());
    document.getElementById("egreso").innerHTML = formattCurrency(totalEgress());
    document.getElementById("porcentaje").innerHTML = formattPercent(egressPorcent);
}

const loadEgress = () => {
    let egressHTML = '';
    for (element of egress) {
        egressHTML += createEgressHTML(element);
    }
    document.getElementById("lista-egreso").innerHTML = egressHTML;
}

const loadIncome = () => {
    let incomeHTML = '';
    for (element of income) {
        incomeHTML += createIncomeHTML(element);
    }
    document.getElementById("lista-ingresos").innerHTML = incomeHTML;
}

const createIncomeHTML = (income) => {
    let incomeHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${formattCurrency(income.description)}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formattCurrency(income.value)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="deleteIncome(${income.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return incomeHTML;
}

const deleteIncome = (id) => {
    let indexDelete = income.findIndex ( (item) => item.id === id);
    income.splice(indexDelete, 1);
    loadHeader();
    loadIncome();
}
 
const createEgressHTML = (egress) => {
    let egressHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egress.description}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formattCurrency(egress.value)}</div>
            <div class="elemento_porcentaje">${formattPercent(egress.value / totalIncome())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="deleteEgress(${egress.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return egressHTML;
}

const deleteEgress = (id) => {
    let indexDelete = egress.findIndex((item) => item.id === id);
    egress.splice(indexDelete, 1);
    loadHeader();
    loadEgress();
}


const addData = () => {
    let data = document.forms['forma'];
    let type = data['tipo'];
    let description = data['descripcion'];
    let valueHTML = data['valor'];
    if(description.value !== '' && valueHTML.value !== '') {
        if(type.value == 'ingreso') {
            income.push({description: description.value, value: +valueHTML.value});
            // income.push(new income(description.value, +valueHTML.value));
            loadHeader();
            loadIncome();
        } else {
            egress.push({description: description.value, value: +valueHTML.value});
            loadHeader();
            loadEgress();
        }
    }
}