const hxy_to_hxb_multiplier = 1e4;
const hxy_multiplier = 1e8; // ERC20 Decimals
const hxb_multiplier = 1e8; // ERC20 Decimals
const contract_abi = [
  {
    constant: false,
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'receiver',
        type: 'string',
      },
    ],
    name: 'triggerTransfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_hxy',
        type: 'address',
      },
      {
        name: '_hxb',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            name: 'id',
            type: 'uint256',
          },
          {
            name: 'tokens',
            type: 'uint256',
          },
          {
            name: 'sender',
            type: 'address',
          },
          {
            name: 'receiver',
            type: 'string',
          },
        ],
        indexed: false,
        name: 'transferGroup',
        type: 'tuple',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'HXB',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'HXBCost',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'HXY',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'nextId',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ready',
    outputs: [
      {
        name: 'hxy_ready',
        type: 'bool',
      },
      {
        name: 'hxb_ready',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'transferGroups',
    outputs: [
      {
        name: 'id',
        type: 'uint256',
      },
      {
        name: 'tokens',
        type: 'uint256',
      },
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'receiver',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
const hxy_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const hxb_abi = hxy_abi;

const contract_address = '0x37b10cAa59C7FC12bD88f6C49336A153Dc8514Cf';
const hxy_address = '0xf3a2ace8e48751c965ea0a1d064303aca53842b9';
const hxb_address = '0x9bb6fd000109e24eb38b0deb806382ff9247e478';

// window.addEventListener('load', async () => {
//   // Modern dapp browsers...
//   if (window.ethereum) {
//     window.web3 = new Web3(ethereum);
//     try {
//       await ethereum.enable();
//       // Acccounts now exposed
//       web3.eth.sendTransaction({
//         /* ... */
//       });
//     } catch (error) {
//       // User denied account access...
//     }
//   }
//   // Legacy dapp browsers...
//   else if (window.web3) {
//     window.web3 = new Web3(web3.currentProvider);
//     // Acccounts always exposed
//     web3.eth.sendTransaction({
//       /* ... */
//     });
//   }
//   // Non-dapp browsers...
//   else {
//     console.log(
//       'Non-Ethereum browser detected. You should consider trying MetaMask!'
//     );
//   }
// });

const setConnected = async () => {
  await ethereum.send('eth_requestAccounts');
  $('#connect-mm span').text('Connected');
  window.web3 = new Web3(window.web3.currentProvider);
};

const formatToCurrency = (label, amount, decimals = 3) => {
  return (
    label +
    '&nbsp;' +
    amount.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  );
};

$(document).ready(() => {
  if (window.ethereum && window.ethereum.isConnected()) {
    console.log('connected');
    setConnected();
  }

  // Set balance interval to always have the latest balances
  // setInterval(() => (

  // ))
});

(() => {
  $('#connect-mm').click(async () => {
    console.log(window.ethereum);
    if (!window.ethereum) {
      alert('Install/Activate MetaMask');
      return;
    }

    if (window.ethereum.isConnected()) {
      console.log('connected');
      setConnected();
      return;
    } else {
      setConnected();
      return;
    }
  });

  $('#hxy-input').on('change paste keyup', (val) => {
    $('#hxb-input').val(
      parseFloat($('#hxy-input').val()) * hxy_to_hxb_multiplier
    );
    return;
  });

  $('#close-approval').click(() => {
    $('#approval').css('display', 'none');
  });

  $(window).click((event) => {
    if (event.target == $('#approval').get(0)) {
      $('#approval').css('display', 'none');
    }
  });

  $('#approve-hxy').click(async () => {
    const hxy = parseFloat($('#hxy-input').val());
    const hxb = hxy * hxy_to_hxb_multiplier;
    const hxy_scaled = hxy * hxy_multiplier;

    const HXY = new web3.eth.Contract(hxy_abi, hxy_address);
    await HXY.methods
      .approve(contract_address, hxy_scaled.toString())
      .send({ from: ethereum.selectedAddress });
  });

  $('#approve-hxb').click(async () => {
    const hxy = parseFloat($('#hxy-input').val());
    const hxb = hxy * hxy_to_hxb_multiplier;
    const hxb_scaled = hxb * hxb_multiplier;

    const HXB = new web3.eth.Contract(hxb_abi, hxb_address);
    await HXB.methods
      .approve(contract_address, hxb_scaled.toString())
      .send({ from: ethereum.selectedAddress });
  });

  $('#wrap-it').click(async () => {
    const receiver = $('#tron-address').val();
    const hxy = parseFloat($('#hxy-input').val());

    if (!receiver || !hxy) {
      alert('Invalid form data');
      return;
    }

    const hxb = hxy * hxy_to_hxb_multiplier;
    const hxy_scaled = hxy * hxy_multiplier;
    const hxb_scaled = hxb * hxb_multiplier;

    const HXY = new web3.eth.Contract(hxy_abi, hxy_address);
    const HXB = new web3.eth.Contract(hxb_abi, hxb_address);
    const CCT = new web3.eth.Contract(contract_abi, contract_address);

    $('#approval').css('display', 'block');

    const ready = await CCT.methods
      .ready(hxy_scaled.toString())
      .call({ from: ethereum.selectedAddress });

    if (!ready.hxy_ready)
      await HXY.methods
        .approve(contract_address, hxy_scaled.toString())
        .send({ from: ethereum.selectedAddress });

    if (!ready.hxb_ready)
      await HXB.methods
        .approve(contract_address, hxb_scaled.toString())
        .send({ from: ethereum.selectedAddress });

    const interval = setInterval(async () => {
      const status = await CCT.methods
        .ready(hxy_scaled.toString())
        .call({ from: ethereum.selectedAddress });

      if (status.hxy_ready) {
        $('#hxy-state').text('Complete');
        $('#hxy-trailing').text('.');
      } else {
        let val = $('#hxy-trailing').text();
        if (val === '...') val = '..';
        else if (val === '..') val = '.';
        else if (val === '.') val = '...';
        $('#hxy-trailing').text(val);
      }

      if (status.hxb_ready) {
        $('#hxb-state').text('Complete');
        $('#hxb-trailing').text('.');
      } else {
        let val = $('#hxb-trailing').text();
        if (val === '...') val = '..';
        else if (val === '..') val = '.';
        else if (val === '.') val = '...';
        $('#hxb-trailing').text(val);
      }

      if (status.hxy_ready && status.hxb_ready) {
        $('#trigger-transfer').attr('disabled', false);
        clearInterval(interval);
      }
    }, 1000);
  });

  $('#trigger-transfer').click(async () => {
    const receiver = $('#tron-address').val();
    const hxy = parseFloat($('#hxy-input').val());

    if (!receiver || !hxy) {
      alert('Invalid form data');
      return;
    }

    const hxb = hxy * hxy_to_hxb_multiplier;
    const hxy_scaled = hxy * hxy_multiplier;

    const CCT = new web3.eth.Contract(contract_abi, contract_address);

    const ready = await CCT.methods
      .ready(hxy_scaled.toString())
      .call({ from: ethereum.selectedAddress });
    console.log('ready', ready);

    if (!ready.hxy_ready || !ready.hxb_ready) {
      alert('HXY or HXB approval not completed');
      return;
    }

    // Set pending state somewhere
    await CCT.methods
      .triggerTransfer(hxy_scaled.toString(), receiver)
      .send({ from: ethereum.selectedAddress });
    // Set interval for pending state (need to hook up with tronweb)
  });
})();
