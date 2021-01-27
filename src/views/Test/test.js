import InextInputText from '@/layouts/components/input-text/input-text.vue';
import VButton from '@/layouts/components/button/button.vue';
import InextLanguageSelect from '@/components/custom-popup/language-select/language-select.vue';

export default {
  components: {
    InextInputText,
    VButton,
    InextLanguageSelect
  },
  data () {
    return {
      activeModal: false,
      countryList: [],
      country: {},
      wallet: 0
    };
  },
  provide () {
    return {
      formValidator: this.$validator
    };
  },
  mounted () {
    this.countryList = [
      {
        value: 'en'
      },
      {
        value: 'sw'
      }
    ];
  },
  methods: {
    inextCharge (reaming) {
      let numb = this.wallet * 0.9801;
      if (!reaming) {
        numb = this.wallet - numb;
      } 
      return this.FixDecimalPoints(numb);
     
    },
    SaleryOrIncomeTaxesCharges () {
      let numb = this.afetrIncometaxes();
      numb *= this.saleryTaxes();
      return this.FixDecimalPoints(numb);
    },
    EmployersContributetionTaxesCharges () {
      let numb = this.afetrIncometaxes();
      numb *= 0.3142;
      return this.FixDecimalPoints(numb);
    },
    afetrIncometaxes () {
      return this.inextCharge(true) / this.incomeTax();
    },
    FixDecimalPoints (numb) {
      numb = +numb.toFixed(2);
      return numb;
    },
    WhatsLeft () {
      const numb =
        this.inextCharge(true) -
        this.EmployersContributetionTaxesCharges() -
        this.SaleryOrIncomeTaxesCharges();    
      return this.FixDecimalPoints(numb);

    },
    incomeTax () {
      switch (this.country.value) {
      case 'sw':
        return 1.314208333333333;
      case 'dk':
        return 1.22;
      case 'no':
        return 1.27;
      case 'en':
        return 1;
      default:
        return 1;
      }
    },
    saleryTaxes () {
      switch (this.country.value) {
      case 'sw':
        return 0.30;
      default :
        return 0.40;
      }
    },
    popupEvent (event) {
      this.activeModal = event;
    },
    selectedCountry (event) {
      this.country = event;
    }
  }
};
