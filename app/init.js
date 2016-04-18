export const init = {
	profiles:{
		FAMILY: {
			Polyclinic: 6 ,
			GeneralHos: 3,
			Supermarke: 8,
			ShoppingMa: 2,
			Primary: 9,
			Secondary: 7,
			Tertiary: 5,
			Childcare : 10,
			Eldercare: 8,
			PoliceStat: 3,
			FireStatio: 1,
			Library: 5,
			MRT: 10,
		}, CAREER: {
			Polyclinic: 2 ,
			GeneralHos: 1,
			Supermarke: 3,
			ShoppingMa: 10,
			Primary: 0,
			Secondary: 0,
			Tertiary: 0,
			Childcare : 0,
			Eldercare: 0,
			PoliceStat: 7,
			FireStatio: 1,
			Library: 2,
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
				GeneralHos: {
					name: "Hospital", 
					value: 3}
			}
		},
		Shopping: {
			name: "Shopping",
			weights: {
				Supermarke: {
					name: "Supermarket", 
					},
				ShoppingMa: {
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
		Transportation: {
			name: "Transportation",
			weights: {
				MRT: {
					name: "MRT", 
					},
			}
		},
		Others: {
			name: "Others",
			weights: {
				PoliceStat: {
					name: "Police Dept", 
					},
				FireStatio: {
					name: "Fire Dept", 
					},
				Library: {
					name: "Libraries", 
					},
			}
		},
	},
	weights: {
		Polyclinic: 6 ,
		GeneralHos: 3,
		Supermarke: 8,
		ShoppingMa: 2,
		Primary: 9,
		Secondary: 7,
		Tertiary: 5,
		Childcare : 10,
		Eldercare: 8,
		PoliceStat: 3,
		FireStatio: 1,
		Library: 5,
		MRT: 10,
	}, 
	filters: {
		Polyclinic: true,
		GeneralHos: true,
		Supermarke: false,
		ShoppingMa: false,
		Primary: false,
		Secondary: false,
		Tertiary: false,
		Childcare : false,
		Eldercare: false,
		PoliceStat: false,
		FireStatio: false,
		Library: false,
		MRT: false,
	}
};
