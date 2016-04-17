export const init = {
	profiles:{
		FAMILY: {
			Polyclinic: 6 ,
			GeneralHospital: 3,
			Supermarket: 8,
			ShoppingMall: 2,
			Primary: 9,
			Secondary: 7,
			Tertiary: 5,
			Childcare : 10,
			Eldercare: 8,
			PoliceStations: 3,
			FireStations: 1,
			Libraries: 5,
			MRT: 10,
		}, CAREER: {
			Polyclinic: 2 ,
			GeneralHospital: 1,
			Supermarket: 3,
			ShoppingMall: 10,
			Primary: 0,
			Secondary: 0,
			Tertiary: 0,
			Childcare : 0,
			Eldercare: 0,
			PoliceStations: 7,
			FireStations: 1,
			Libraries: 2,
			MRT: 5
		}
	},
	schema: {
		Medical: {
			name: "Medical",
			weights: {
				Polyclinic: {
					name: "Polyclinic", 
					},
				GeneralHospital: {
					name: "General Hospital", 
					value: 3}
			}
		},
		Shopping: {
			name: "Shopping",
			weights: {
				Supermarket: {
					name: "Supermarket", 
					},
				ShoppingMall: {
					name: "Shopping Mall", 
					value: 2}
			}
		},
		EducationInstitutions: {
			name: "Education Institutions",
			weights: {
				Primary: {
					name: "Primary", 
					},
				Secondary: {
					name: "Secondary", 
					},
				Tertiary: {
					name: "Tertiary", 
					},
			}
		},
		CareFacilities: {
			name: "Care Facilities",
			weights: {
				Childcare: {
					name: "Childcare", 
					},
				Eldercare: {
					name: "Eldercare", 
					},
			}
		},
		Others: {
			name: "Others",
			weights: {
				PoliceStations: {
					name: "Police Stations", 
					},
				FireStations: {
					name: "Fire Stations", 
					},
				Libraries: {
					name: "Libraries", 
					},
			}
		},
		Transportation: {
			name: "Transportation",
			weights: {
				MRT: {
					name: "MRT", 
					},
			}
		}
	},
	weights: {
		Polyclinic: 6 ,
		GeneralHospital: 3,
		Supermarket: 8,
		ShoppingMall: 2,
		Primary: 9,
		Secondary: 7,
		Tertiary: 5,
		Childcare : 10,
		Eldercare: 8,
		PoliceStations: 3,
		FireStations: 1,
		Libraries: 5,
		MRT: 10,
	}, 
	filters: {
		Polyclinic: true,
		GeneralHospital: true,
		Supermarket: false,
		ShoppingMall: false,
		Primary: false,
		Secondary: false,
		Tertiary: false,
		Childcare : false,
		Eldercare: false,
		PoliceStations: false,
		FireStations: false,
		Libraries: false,
		MRT: false,
	}
};
