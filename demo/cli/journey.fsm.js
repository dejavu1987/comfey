export default {
  start: 'livingRoom',
  livingRoom: {
    openDrawer: 'drawer',
    enterBath: 'bath',
    exitApartment: 'street',
  },
  drawer: {
    closeDrawer: 'livingRoom',
  },
  bath: {
    exitBath: 'livingRoom',
  },
  street: {
    enterKiosk: 'kiosk',
    enterMall: 'mall',
    enterApartment: 'livingRoom',
    enterSupermarket: 'supermarket',
    enterHospital: 'hospital',
    enterBar: 'bar',
  },
  kiosk: {
    exitKiosk: 'street',
  },
  bar: {
    exitBar: 'street',
  },
  mall: {
    exitMall: 'street',
    enterSupermarket: 'supermarket',
  },
  supermarket: {
    exitSupermarket: 'street',
  },
  hospital: {
    exitHospital: 'street',
  },
};
