const productsData = [
  {
    id: 1,
    name: "Porcelanato Bisotado Delta 84x84cm",
    category: "Pisos & Revestimentos",
    price: 69.90,
    unit: "m²",
    badge: "RETIRE EM 2H",
    badgeColor: "bg-emerald-100 text-emerald-800",
    stock: "142 m² na Filial",
    img: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=80",
    spec: "Acabamento polido, Borda retificada, PEI 4. Ideal para ambientes internos.",
    phase: "Fase 2: Acabamento"
  },
  {
    id: 2,
    name: "Tinta Suvinil Toque da Terra 18L",
    category: "Tintas",
    price: 389.90,
    unit: "lata",
    badge: "PRONTA ENTREGA NA OBRA",
    badgeColor: "bg-orange-100 text-orange-800",
    stock: "28 latas na Filial",
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80",
    spec: "Rendimento até 120m² por demão. Acabamento fosco aveludado e lavável.",
    phase: "Fase 2: Acabamento"
  },
  {
    id: 3,
    name: "Cimento CP II Z 32 Tocantins 50kg",
    category: "Bruto & Cimento",
    price: 34.90,
    unit: "un",
    badge: "PRONTA ENTREGA NA OBRA",
    badgeColor: "bg-orange-100 text-orange-800",
    stock: "520 sacos na Filial",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
    spec: "Uso geral em fundações, vigas, lajes e emboço. Alta resistência inicial.",
    phase: "Fase 1: Estrutura"
  },
  {
    id: 4,
    name: "Argamassa ACIII Quartzolit 20kg",
    category: "Bruto & Cimento",
    price: 42.90,
    unit: "un",
    badge: "RETIRE EM 2H",
    badgeColor: "bg-emerald-100 text-emerald-800",
    stock: "85 sacos na Filial",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    spec: "Alta aderência para porcelanatos grandes formatos, piscinas e faixadas.",
    phase: "Fase 1: Estrutura"
  },
  {
    id: 5,
    name: "Furadeira/Parafusadeira Bosch 18V",
    category: "Ferramentas",
    price: 549.00,
    unit: "un",
    badge: "PRONTA ENTREGA NA OBRA",
    badgeColor: "bg-orange-100 text-orange-800",
    stock: "12 un na Filial",
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80",
    spec: "Motor Brushless, 2 Baterias 2.0Ah, Carregador Bivolt e Maleta inclusos.",
    phase: "Ferramentas & Equipamentos"
  },
  {
    id: 6,
    name: "Tubo PVC Esgoto 100mm 6M Tigre",
    category: "Hidráulica",
    price: 58.50,
    unit: "un",
    badge: "RETIRE EM 2H",
    badgeColor: "bg-emerald-100 text-emerald-800",
    stock: "60 barras na Filial",
    img: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=400&q=80",
    spec: "Norma NBR 5688. Junta soldável e elástica para esgoto predial.",
    phase: "Fase 1: Estrutura"
  }
];

let cartState = [
  { id: 1, qty: 10 },
  { id: 3, qty: 5 }
];

let currentCalcType = 'piso';
let deliveryMode = 'retirada';

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(`tab-${tabId}`).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('text-brand-orange');
    btn.classList.add('text-slate-400');
    btn.querySelector('span').classList.remove('font-extrabold');
  });

  const activeNav = document.getElementById(`nav-${tabId}`);
  if(activeNav) {
    activeNav.classList.remove('text-slate-400');
    activeNav.classList.add('text-brand-orange');
    activeNav.querySelector('span').classList.add('font-extrabold');
  }
}

function renderProducts(items = productsData) {
  const grid = document.getElementById('products-grid');
  document.getElementById('product-count').textContent = `${items.length} itens`;

  grid.innerHTML = items.map(p => `
    <div class="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
      <div onclick="openProductModal(${p.id})" class="cursor-pointer">
        <div class="relative">
          <img src="${p.img}" alt="${p.name}" class="w-full h-28 object-cover rounded-xl">
          <span class="absolute top-1.5 left-1.5 text-[8px] font-extrabold px-1.5 py-0.5 rounded ${p.badgeColor} shadow-sm uppercase">
            ${p.badge}
          </span>
        </div>
        <p class="text-[10px] text-slate-400 uppercase font-semibold mt-2">${p.category}</p>
        <h4 class="font-bold text-xs text-slate-900 leading-snug line-clamp-2 h-8 mt-0.5">${p.name}</h4>
      </div>

      <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-xs font-black text-brand-orange">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
          <span class="text-[9px] text-slate-400">/${p.unit}</span>
        </div>
        <button onclick="addToCart(${p.id}, 1)" class="bg-brand-orange hover:bg-brand-orange-dark text-white p-2 rounded-xl shadow transition">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function filterByCategory(cat) {
  if(cat === 'Todos') {
    renderProducts(productsData);
  } else {
    const filtered = productsData.filter(p => p.category === cat);
    renderProducts(filtered);
  }
  showToast(`Filtrado por: ${cat}`);
}

function filterProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = productsData.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
  renderProducts(filtered);
}

function setCalcType(type) {
  currentCalcType = type;
  const btnPiso = document.getElementById('calc-tab-piso');
  const btnTinta = document.getElementById('calc-tab-tinta');
  const heightCont = document.getElementById('calc-height-container');

  if(type === 'piso') {
    btnPiso.className = "py-2 text-xs font-bold rounded-lg bg-white text-brand-slate shadow transition";
    btnTinta.className = "py-2 text-xs font-bold rounded-lg text-slate-600 hover:text-brand-slate transition";
    heightCont.classList.add('hidden');
    document.getElementById('res-product-name').textContent = "Porcelanato Bisotado 84x84";
  } else {
    btnTinta.className = "py-2 text-xs font-bold rounded-lg bg-white text-brand-slate shadow transition";
    btnPiso.className = "py-2 text-xs font-bold rounded-lg text-slate-600 hover:text-brand-slate transition";
    heightCont.classList.remove('hidden');
    document.getElementById('res-product-name').textContent = "Tinta Suvinil 18L";
  }
  runCalculation();
}

function runCalculation() {
  const w = parseFloat(document.getElementById('calc-width').value) || 0;
  const l = parseFloat(document.getElementById('calc-length').value) || 0;
  const h = parseFloat(document.getElementById('calc-height').value) || 0;
  const margin = parseInt(document.getElementById('calc-margin').value) || 10;

  document.getElementById('margin-val-label').textContent = `${margin}%`;

  let areaBase = 0;
  if(currentCalcType === 'piso') {
    areaBase = w * l;
  } else {

    areaBase = (2 * w * h) + (2 * l * h);
  }

  const areaTotalWithMargin = areaBase * (1 + (margin / 100));

  document.getElementById('res-area').textContent = areaBase.toFixed(1);
  document.getElementById('res-area-margin').textContent = `${areaTotalWithMargin.toFixed(1)} m²`;

  if(currentCalcType === 'piso') {

    const boxes = Math.ceil(areaTotalWithMargin / 2.2);
    const totalCost = boxes * 2.2 * 69.90;

    document.getElementById('res-qty-boxes').textContent = `${boxes} caixas (${(boxes * 2.2).toFixed(1)} m²)`;
    document.getElementById('res-total-cost').textContent = `R$ ${totalCost.toFixed(2).replace('.', ',')}`;
  } else {

    const cans = Math.ceil(areaTotalWithMargin / 100);
    const totalCost = cans * 389.90;

    document.getElementById('res-qty-boxes').textContent = `${cans} lata(s) de 18L`;
    document.getElementById('res-total-cost').textContent = `R$ ${totalCost.toFixed(2).replace('.', ',')}`;
  }
}

function addCalculatedToCart() {
  if(currentCalcType === 'piso') {
    const w = parseFloat(document.getElementById('calc-width').value) || 0;
    const l = parseFloat(document.getElementById('calc-length').value) || 0;
    const margin = parseInt(document.getElementById('calc-margin').value) || 10;
    const boxes = Math.ceil((w * l * (1 + margin/100)) / 2.2);
    addToCart(1, boxes);
  } else {
    addToCart(2, 1);
  }
  switchTab('minha-obra');
}

function addToCart(productId, qtyToAdd = 1) {
  const existing = cartState.find(item => item.id === productId);
  if(existing) {
    existing.qty += qtyToAdd;
  } else {
    cartState.push({ id: productId, qty: qtyToAdd });
  }
  updateCartUI();
  showToast("Item adicionado à sua Obra!");
}

function updateQty(productId, delta) {
  const item = cartState.find(i => i.id === productId);
  if(item) {
    item.qty += delta;
    if(item.qty <= 0) {
      cartState = cartState.filter(i => i.id !== productId);
    }
  }
  updateCartUI();
}

function setDeliveryMode(mode) {
  deliveryMode = mode;
  const labRet = document.getElementById('mode-retirada-label');
  const labEnt = document.getElementById('mode-entrega-label');

  if(mode === 'retirada') {
    labRet.className = "border-2 border-brand-orange bg-orange-50/50 p-2.5 rounded-xl cursor-pointer flex flex-col justify-between transition";
    labEnt.className = "border-2 border-slate-200 p-2.5 rounded-xl cursor-pointer flex flex-col justify-between transition";
  } else {
    labEnt.className = "border-2 border-brand-orange bg-orange-50/50 p-2.5 rounded-xl cursor-pointer flex flex-col justify-between transition";
    labRet.className = "border-2 border-slate-200 p-2.5 rounded-xl cursor-pointer flex flex-col justify-between transition";
  }
  updateCartUI();
}

function updateCartUI() {
  const totalItemsCount = cartState.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cart-item-badge').textContent = `${totalItemsCount} itens`;
  document.getElementById('nav-cart-badge').textContent = totalItemsCount;

  const container = document.getElementById('cart-items-container');

  if(cartState.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl p-6 text-center text-slate-400 border border-slate-200 space-y-2">
        <svg class="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        <p class="text-xs font-bold text-slate-600">Sua lista de obra está vazia</p>
        <p class="text-[11px]">Navegue pela loja ou use a calculadora para adicionar materiais.</p>
      </div>
    `;
    document.getElementById('summary-subtotal').textContent = "R$ 0,00";
    document.getElementById('summary-total').textContent = "R$ 0,00";
    return;
  }

  let subtotal = 0;
  const phasesMap = {};

  cartState.forEach(cartItem => {
    const prod = productsData.find(p => p.id === cartItem.id);
    if(!prod) return;

    const itemTotal = prod.price * cartItem.qty;
    subtotal += itemTotal;

    if(!phasesMap[prod.phase]) {
      phasesMap[prod.phase] = [];
    }

    phasesMap[prod.phase].push({
      ...prod,
      qty: cartItem.qty,
      itemTotal
    });
  });

  let html = '';
  for (const [phaseName, items] of Object.entries(phasesMap)) {
    html += `
      <div class="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 space-y-2">
        <h4 class="text-[11px] font-extrabold text-brand-orange uppercase tracking-wide flex items-center gap-1">
          <span>🔨 ${phaseName}</span>
        </h4>
        <div class="divide-y divide-slate-100">
          ${items.map(item => `
            <div class="py-2.5 flex items-center justify-between gap-2">
              <img src="${item.img}" class="w-10 h-10 object-cover rounded-lg shrink-0">
              <div class="flex-1 min-w-0">
                <h5 class="text-xs font-bold text-slate-800 truncate">${item.name}</h5>
                <span class="text-[10px] text-slate-400">R$ ${item.price.toFixed(2).replace('.', ',')} / ${item.unit}</span>
              </div>

              <!-- Controles de Quantidade -->
              <div class="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
                <button onclick="updateQty(${item.id}, -1)" class="w-5 h-5 bg-white text-slate-700 font-bold text-xs rounded flex items-center justify-center shadow-sm">-</button>
                <span class="text-xs font-extrabold text-slate-800 px-1">${item.qty}</span>
                <button onclick="updateQty(${item.id}, 1)" class="w-5 h-5 bg-white text-slate-700 font-bold text-xs rounded flex items-center justify-center shadow-sm">+</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  const shippingCost = deliveryMode === 'entrega' ? 45.00 : 0.00;
  const discount = subtotal > 300 ? 20.00 : 0.00;
  const finalTotal = subtotal + shippingCost - discount;

  document.getElementById('summary-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('summary-shipping').textContent = shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`;
  document.getElementById('summary-discount').textContent = `- R$ ${discount.toFixed(2).replace('.', ',')}`;
  document.getElementById('summary-total').textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
}

function openProductModal(id) {
  const p = productsData.find(item => item.id === id);
  if(!p) return;

  document.getElementById('modal-img').src = p.img;
  document.getElementById('modal-title').textContent = p.name;
  document.getElementById('modal-badge').textContent = p.badge;
  document.getElementById('modal-stock').textContent = p.stock;
  document.getElementById('modal-spec').textContent = p.spec;
  document.getElementById('modal-price').textContent = `R$ ${p.price.toFixed(2).replace('.', ',')}`;

  const btn = document.getElementById('modal-add-btn');
  btn.onclick = () => {
    addToCart(p.id, 1);
    closeProductModal();
  };

  const modal = document.getElementById('product-modal');
  const sheet = modal.querySelector('.modal-sheet');

  modal.classList.remove('hidden');
  setTimeout(() => {
    sheet.classList.remove('closed');
    sheet.classList.add('open');
  }, 10);
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  const sheet = modal.querySelector('.modal-sheet');
  sheet.classList.remove('open');
  sheet.classList.add('closed');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}

function finishOrder() {
  if(cartState.length === 0) {
    showToast("Adicione itens para solicitar entrega.");
    return;
  }
  showToast("🚀 Pedido #9042 Enviado à Unidade Marginal Tietê!");
  cartState = [];
  updateCartUI();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2500);
}

function updateClock() {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('current-time').textContent = `${hrs}:${mins}`;
}

window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  runCalculation();
  updateCartUI();
  updateClock();
  setInterval(updateClock, 30000);
});
