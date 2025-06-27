import { useEffect, useState } from "react";
import { ChevronDown, Upload, Calendar, Clock, X } from "lucide-react";
import { toast } from "sonner";
import PhoneInput from "./PhoneInput";
const logo = "../../public/images/travelninja.png";

interface FormData {
  userType: string;
  country: string;
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  cityRegion: string;
  propertyType: string;
  amenities: string[];
  rooms: string;
  checkInTime: string;
  checkOutTime: string;
  tourTypes: string[];
  operatesTreks: string;
  internationalTourists: string;
  activity: string[];
  workingDays: string;
  workingHours: { from: string; to: string };
  rentalType: string;
  vehicleCount: string;
  safetyDeposit: string;
  selfDrive: string;
  specialty: string[];
  experience: string;
  photos: File[];
  documents: File[];
}

const MultiStepForm = () => {
  // const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    userType: "",
    country: "",
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    cityRegion: "",
    propertyType: "",
    amenities: [],
    rooms: "",
    checkInTime: "17:00",
    checkOutTime: "11:00",
    tourTypes: [],
    operatesTreks: "",
    internationalTourists: "",
    activity: [],
    workingDays: "",
    workingHours: { from: "17:00", to: "Anytime" },
    rentalType: "",
    vehicleCount: "",
    safetyDeposit: "",
    selfDrive: "",
    specialty: [],
    experience: "",
    photos: [],
    documents: [],
  });

  // ... keep existing code (businessTypes, amenitiesList, activities, specialties)

  const businessTypes = [
    {
      id: "hotel",
      title: "Hotel",
      description: "List your hotel, lodge, homestay or guesthouse",
    },
    {
      id: "tour",
      title: "Tour operator",
      description: "Offer guided multi-day tours, treks, and expeditions",
    },
    {
      id: "activity",
      title: "Activity operator",
      description: "Provide activities like rafting, paragliding, or skiling",
    },
    {
      id: "rental",
      title: "Rental provider",
      description: "Rent out cars, bikes, or other vehicles to travelers",
    },
    {
      id: "guide",
      title: "Tour guide",
      description: "Register as a guide & offer guided experiences",
    },
  ];

  const amenitiesList = [
    "Free Wi-Fi",
    "Paid Wi-Fi",
    "24/7 Front Desk",
    "Heating",
    "Lake View",
    "River View",
    "TVs",
    "Concierge Service",
    "Luggage Storage",
    "Express Check-in/Check-out",
    "Early Check-in Available",
    "Late Check-out Available",
    "Elevator",
    "Lobby Seating Area",
    "ATM On-Site",
    "Business Center",
    "Conference Rooms",
    "Meeting Rooms",
    "Smoking Allowed",
    "Non-Smoking Rooms",
    "Pet-Friendly",
    "No Pets Allowed",
    "CCTV in Common Areas",
    "Security Guard on Duty",
    "Fire Extinguishers & Safety Equipment",
    "Backup Power Generator",
    "Free Breakfast",
    "Breakfast Buffet",
    "In-Room Dining",
    "24/7 Room Service",
    "On-Site Restaurant",
    "Rooftop Restaurant",
    "Café",
    "Bar/Lounge",
    "Outdoor Dining Area",
    "Kids' Meals Available",
    "Vegan Food Options",
    "Gluten-Free Options",
    "Free Parking",
    "Paid Parking",
    "Valet Parking",
    "Parking Garage",
    "Car Rental Service",
    "Bike Rental Service",
    "Swimming Pool (Indoor)",
    "Swimming Pool (Outdoor)",
    "Heated Pool",
    "Kids' Pool",
    "Sauna",
    "Hot Tub/Jacuzzi",
    "Steam Room",
    "Gym/Fitness Center",
    "Garden",
    "Picnic Area",
    "Family Rooms Available",
    "Connecting Rooms",
    "Kids' Play Area",
    "Wheelchair Accessible Entrance",
    "Wheelchair Accessible Rooms",
    "Lowered Sinks for Accessibility",
    "Free Printing/Photocopying",
    "Private Meeting Rooms",
    "Wedding/Event Planning Services",
    "Solar Panels",
    "Water Refill Stations",
    "Recycling Bins in Rooms",
    "No Plastic Straws Policy",
    "Energy-Efficient Lighting",
    "Organic Toiletries",
    "Locally Sourced Food",
  ];

  const activities = [
    "Paragliding",
    "Zip lining",
    "Boat ride",
    "Jet skiing",
    "Kayaking",
    "Horseriding",
    "ATV & Dirt biking",
    "Jeep ride",
    "Rafting",
    "Fishing",
    "Scuba diving",
    "Other",
  ];

  const specialties = [
    "Adventure",
    "Culture",
    "Spiritual",
    "Wildlife",
    "History",
    "City sightseeing",
    "Food",
    "Women-only",
  ];

  const getStepsForUserType = (type: string) => {
    switch (type) {
      case "hotel":
        return 5;
      case "tour":
        return 3;
      case "activity":
        return 3;
      case "rental":
        return 3;
      case "guide":
        return 3;
      default:
        return 0;
    }
  };

  const validateCurrentStep = () => {
    if (currentStep === 0 && !userType) {
      toast.error("Please select a business type to continue.");
      return false;
    }

    if (currentStep === 1) {
      const requiredFields = [
        "country",
        "businessName",
        "phone",
        "email",
        "password",
      ];
      if (userType !== "guide") {
        requiredFields.push("contactName");
      }

      for (const field of requiredFields) {
        if (!formData[field as keyof FormData]) {
          toast.error("Please fill in all required fields.");
          return false;
        }
      }

      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        toast.error("Please enter a valid email address.");
        return false;
      }

      if (formData.password && formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return false;
      }
    }

    return true;
  };

  const transformDataForAPI = () => {
    const supplierTypeMap: { [key: string]: string } = {
      hotel: "hotel",
      tour: "tour_operator",
      activity: "activity_operator",
      rental: "rental",
      guide: "tour_guide",
    };

    let profile_data = {};

    switch (userType) {
      case "hotel":
        profile_data = {
          property_name: formData.businessName,
          property_type: formData.propertyType,
          amenities: formData.amenities,
          check_in_time: formData.checkInTime,
          check_out_time: formData.checkOutTime,
          photos: formData.photos.map((file) => file.name),
          rooms: parseInt(formData.rooms) || 0,
          address: formData.address,
          city_region: formData.cityRegion,
          country: formData.country,
          contact_name: formData.contactName,
          phone_number: formData.phone,
          email: formData.email,
          verification_doc:
            formData.documents.length > 0 ? formData.documents[0].name : "",
        };
        break;

      case "tour":
        profile_data = {
          business_name: formData.businessName,
          contact_name: formData.contactName,
          phone_number: formData.phone,
          email: formData.email,
          office_address: formData.address,
          city: formData.cityRegion,
          country: formData.country,
          business_registration:
            formData.documents.length > 0 ? formData.documents[0].name : "",
          dts_license:
            formData.documents.length > 1 ? formData.documents[1].name : "",
          tour_types: formData.tourTypes,
          operate_treks: formData.operatesTreks === "Yes",
          international_tourists: formData.internationalTourists === "Yes",
        };
        break;

      case "activity":
        profile_data = {
          business_name: formData.businessName,
          contact_name: formData.contactName,
          phone_number: formData.phone,
          email: formData.email,
          select_activity: formData.activity,
          open_days_hours: `${formData.workingDays} ${formData.workingHours.from}-${formData.workingHours.to}`,
          address: formData.address,
          city: formData.cityRegion,
          country: formData.country,
          eligibility_doc:
            formData.documents.length > 0 ? formData.documents[0].name : "",
          verification_doc:
            formData.documents.length > 1 ? formData.documents[1].name : "",
        };
        break;

      case "rental":
        profile_data = {
          business_name: formData.businessName,
          contact_name: formData.contactName,
          phone_number: formData.phone,
          email: formData.email,
          location: formData.address,
          city: formData.cityRegion,
          country: formData.country,
          verification_doc:
            formData.documents.length > 0 ? formData.documents[0].name : "",
          rental_type: formData.rentalType,
          how_many_cars_bikes: getVehicleCount(formData.vehicleCount),
          offer_self_drive: formData.selfDrive === "Yes",
          require_security_deposit: formData.safetyDeposit === "Yes",
        };
        break;

      case "guide":
        profile_data = {
          name: formData.businessName,
          phone_number: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.cityRegion,
          country: formData.country,
          dts_license:
            formData.documents.length > 0 ? formData.documents[0].name : "",
          identity_doc:
            formData.documents.length > 1 ? formData.documents[1].name : "",
          specialise_in: formData.specialty,
          guide_since: formData.experience,
          international_tourists: formData.internationalTourists === "Yes",
          photos: formData.photos.map((file) => file.name),
        };
        break;

      default:
        profile_data = {};
    }

    return {
      supplier_type: supplierTypeMap[userType],
      profile_data,
      verification_doc:
        formData.documents.length > 0 ? formData.documents[0].name : "",
    };
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user_id");
    const isRegistered = localStorage.getItem("registration_complete");

    if (!isLoggedIn || !isRegistered) {
      setCurrentStep(0);
      setStepIndex(0);
      setUserType("");
    }
  }, []);

  const getVehicleCount = (range: string): number => {
    const numericMap: { [key: string]: number } = {
      "1-5": 3,
      "6-10": 8,
      "11-20": 15,
      "20+": 25,
    };
    return numericMap[range] || 0;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      toast.info("Creating your user account...");

      const API_BASE_URL = "http://159.89.17.162:9000/api/v1";

      // Step 1: Create the user
      const userRegisterResponse = await fetch(
        `${API_BASE_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.contactName || formData.businessName,
            email: formData.email,
            phone_number: formData.phone,
            password: formData.password,
            role: "supplier", // adjust if dynamic
          }),
        }
      );

      const userRegisterResult = await userRegisterResponse.json();

      if (!userRegisterResponse.ok) {
        throw new Error(
          userRegisterResult.message || "User registration failed."
        );
      }

      const userId = userRegisterResult.user.user_id;

      toast.success("User account created. Submitting supplier details...");

      // Step 2: Prepare supplier data
      const supplierBaseData = transformDataForAPI();
      const supplierData = {
        ...supplierBaseData,
        user_id: userId,
      };

      // Step 3: Register supplier
      const supplierResponse = await fetch(
        `${API_BASE_URL}/suppliers/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(supplierData),
        }
      );

      const supplierResult = await supplierResponse.json();

      if (!supplierResponse.ok) {
        throw new Error(
          supplierResult.message || "Supplier registration failed."
        );
      }

      const supplierId = supplierResult.supplier.supplier_id;

      // Store user_id and supplier_id in localStorage
      localStorage.setItem("user_id", userId);
      localStorage.setItem("supplier_id", supplierId);
      localStorage.setItem("registration_complete", "true");

      toast.success("Supplier registered successfully!");

      setTimeout(() => {
        setCurrentStep(4); // Success screen
        setIsSubmitting(false);
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      toast.error(error.message || "Unexpected error occurred.");
    }
  };
  const isRegistrationComplete =
    localStorage.getItem("registration_complete") === "false";

  const handleNext = () => {
    const totalSteps = getStepsForUserType(userType);

    if (currentStep === totalSteps - 1) {
      handleSubmit(); // ✅ now submits *after* verification step (step 4 for hotel)
    } else {
      if (!validateCurrentStep()) return;

      if (stepIndex < totalSteps) {
        setCurrentStep(currentStep + 1);
        setStepIndex(stepIndex + 1);
      }
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      setCurrentStep(0);
      setStepIndex(0);
      setUserType("");
    } else {
      setCurrentStep(currentStep - 1);
      setStepIndex(stepIndex - 1);
    }
  };

  const selectUserType = (type: string) => {
    setUserType(type);
    setFormData({ ...formData, userType: type });
    setStepIndex(0);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const ProgressBar = () => (
    <div className="flex justify-center mb-8 gap-2">
      {Array.from({ length: getStepsForUserType(userType) + 1 }).map(
        (_, index) => (
          <div
            key={index}
            className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
              index === stepIndex ? "bg-blue-600" : "bg-blue-100"
            }`}
          />
        )
      )}
    </div>
  );

  const FileUpload = ({
    label,
    subText,
    multiple = false,
    onChange,
    files = [],
  }: {
    label: string;
    subText: string;
    multiple?: boolean;
    onChange: (files: FileList | null) => void;
    files?: File[];
  }) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-slate-700 text-lg font-semibold">
            {label}
          </label>
        )}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700 font-medium">
                Click to upload
              </span>
              <input
                type="file"
                multiple={multiple}
                className="hidden"
                onChange={(e) => onChange(e.target.files)}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </label>
            <p className="text-sm text-gray-500">{subText}</p>
          </div>
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm text-gray-700 truncate">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = files.filter((_, i) => i !== index);
                      const dt = new DataTransfer();
                      newFiles.forEach((f) => dt.items.add(f));
                      onChange(dt.files);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ... keep existing code (DropdownSelect, MultiSelect, ButtonGroup, PhoneInput components)

  const DropdownSelect = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Select",
  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-2">
        <label className="block text-slate-700 text-lg font-semibold">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full text-left border border-gray-300 rounded-lg px-4 py-3 bg-white text-slate-700 font-medium focus:outline-none focus:border focus:border-[#5461FD] focus:border-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={value ? "text-slate-700" : "text-slate-700"}>
              {value || placeholder}
            </span>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </button>
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-slate-700 font-medium"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const MultiSelect = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="form-group">
        <label className="text-[#283456] text-base sm:text-lg font-semibold mt-[17px]">
          {label}
        </label>
        <div className="relative w-full mt-[3px] mb-[17px]">
          <button
            type="button"
            className="w-full focus:border-[#5461FD] text-left text-base text-[rgba(56,56,56)] px-[12px] py-[12px] border border-[rgba(204,204,204,0.486)] rounded-[7px] font-[URW Geometric] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={
                value.length > 0
                  ? "text-[#283456] font-medium"
                  : "text-[rgba(56,56,56)]"
              }
            >
              {value.length > 0
                ? `${value.length} selected`
                : "Select all amenities"}
            </span>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </button>

          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-[7px] shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center px-2 py-2 hover:bg-gray-50 cursor-pointer rounded"
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option)}
                      onChange={() => {
                        const newValue = value.includes(option)
                          ? value.filter((v) => v !== option)
                          : [...value, option];
                        onChange(newValue);
                      }}
                      className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ButtonGroup = ({
    options,
    value,
    onChange,
    multiple = false,
  }: {
    options: string[];
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
  }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = multiple
          ? Array.isArray(value) && value.includes(option)
          : value === option;

        return (
          <button
            key={option}
            type="button"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => {
              if (multiple) {
                const currentValue = Array.isArray(value) ? value : [];
                const newValue = currentValue.includes(option)
                  ? currentValue.filter((v) => v !== option)
                  : [...currentValue, option];
                onChange(newValue);
              } else {
                onChange(option);
              }
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );

  if (isRegistrationComplete) {
    return (
      <div className="min-h-screen  bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-slate-700 mb-4">
              Let's get you more customers
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="text-xl font-bold text-green-600 mb-4">
                We're reviewing your details...
              </div>

              <div className="space-y-3 text-slate-600 mb-8">
                <div>
                  <strong>What's next?</strong>
                </div>
                <div>Check your email to verify your account.</div>
                <div>You can access the dashboard, and start adding rooms.</div>
                <div>
                  Once approved, you'll be able to start receiving bookings.
                </div>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => {
                  toast.success("Redirecting to dashboard...");
                  // navigate("/dashboard");
                }}
              >
                Log in to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f8]  ">
      <div className="flex justify-center items-center py-4 bg-white">
        <img src={logo} alt="logo" className="w-[120px] sm:w-[150px] object-contain" />
      </div>
      <div className="flex justify-center items-center px-4">
        <div className="w-full max-w-[480px] py-8">
          <div className="text-center mb-8 w-full max-w-[480px]">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#283456] mb-2">
              Let's get you more customers
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-[470px]">
            {userType && <ProgressBar />}


            {/* Step 0: Business Type Selection */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-700 mb-2">
                    Select your category
                  </h2>
                  <p className="text-slate-600">
                    Which category best describes your business?
                  </p>
                </div>

                <div className="space-y-4">
                  {businessTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`w-full text-left relative flex flex-col gap-[8px] items-start font-[URW Geometric] text-base sm:text-lg font-medium transition-all duration-150 ease-in-out 
                      px-[15px] pt-[7px] pb-[12px] rounded-[8px] border 
                      ${
                        userType === type.id
                          ? "border-[#5461fd] border-2"
                          : "border-[#e2e2e2] bg-white text-[#283456]"
                      } 
                      active:scale-[0.98]`}
                      onClick={() => selectUserType(type.id)}
                    >
                      <div className="font-semibold text-[#283456]">
                        {type.title}
                      </div>
                      <div className="text-[15px] text-[#707d99] font-medium leading-tight">
                        {type.description}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!userType}
                    className="bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* ... keep existing code (all the step components) */}

            {/* Contact Information Step */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-700 text-center">
                  For smooth communication
                </h2>

                <div className="space-y-4">
                  <DropdownSelect
                    label="Country"
                    options={["Pakistan", "India", "Nepal", "Bangladesh"]}
                    value={formData.country}
                    onChange={(value) => updateFormData("country", value)}
                  />
                  <div className="form-group">
                    <label className="text-[#283456] text-base sm:text-lg font-semibold mt-[17px]">
                      {userType === "guide"
                        ? "Full name"
                        : userType === "hotel"
                        ? "Your property's name"
                        : "Business name"}
                    </label>
                    <input
                      className="w-full border focus:border-[#5461FD] border-[#e2e2e2] rounded-[5px] px-[15px] py-[10px] mt-[3px] mb-[17px] text-base sm:text-lg font-medium text-[#283456] font-[URW Geometric] focus:outline-none"
                      value={formData.businessName}
                      onChange={(e) =>
                        updateFormData("businessName", e.target.value)
                      }
                      placeholder=""
                    />
                  </div>

                  {userType !== "guide" && (
                    <div className="form-group">
                      <label className="text-[#283456] text-base sm:text-lg font-semibold mt-[17px]">
                        Contact person's name
                      </label>
                      <input
                        className="w-full border focus:border-[#5461FD] border-[#e2e2e2] rounded-[5px] px-[15px] py-[10px] mt-[3px] mb-[17px] text-base sm:text-lg font-medium text-[#283456] font-[URW Geometric] focus:outline-none"
                        value={formData.contactName}
                        onChange={(e) =>
                          updateFormData("contactName", e.target.value)
                        }
                        placeholder=""
                      />
                    </div>
                  )}

                  <PhoneInput
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(value: any) => updateFormData("phone", value)}
       
                  />
                  <div className="form-group">
                    <label className="text-[#283456] text-base sm:text-lg font-semibold mt-[17px]">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="w-full border focus:border-[#5461FD] border-[#e2e2e2] rounded-[5px] px-[15px] py-[10px] mt-[3px] mb-[17px] text-base sm:text-lg font-medium text-[#283456] font-[URW Geometric] focus:outline-none"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder=""
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-[#283456] text-base sm:text-lg font-semibold mt-[17px]">
                      Set password
                    </label>
                    <input
                      type="password"
                      className="w-full border focus:border-[#5461FD] border-[#e2e2e2] rounded-[5px] px-[15px] py-[10px] mt-[3px] mb-[17px] text-base sm:text-lg font-medium text-[#283456] font-[URW Geometric] focus:outline-none"
                      value={formData.password}
                      onChange={(e) =>
                        updateFormData("password", e.target.value)
                      }
                      placeholder=""
                    />
                  </div>

                  <div className="px-[6px] py-[9px] bg-[#ebf1ff] text-[#283456] rounded-[5px] text-[14px] font-medium flex items-center">
                    <p>
                      You'll receive an email to verify your account after
                      registering
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-3">
                  <button
                    onClick={handleBack}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-blue-600 rounded-full text-white px-6 py-2 font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Business Details Steps (step 2) and other steps remain the same */}
            {/* ... keep existing code for steps 2, 3, and verification steps */}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-700 text-center">
                  {userType === "hotel"
                    ? "About your property"
                    : "About your business"}
                </h2>

                <div className="space-y-4">
                  <DropdownSelect
                    label={
                      userType === "hotel"
                        ? "Select region where your property is located"
                        : userType === "tour"
                        ? "Select city or region where you're based in"
                        : "Select city or region where your activity is located"
                    }
                    options={[
                      "Islamabad",
                      "Karachi",
                      "Lahore",
                      "Peshawar",
                      "Quetta",
                    ]}
                    value={formData.cityRegion}
                    onChange={(value) => updateFormData("cityRegion", value)}
                  />

                  <div className="form-group">
                    <label className="text-[#283456] text-base sm:text-lg font-semibold mt-[17px] ">
                      {userType === "hotel"
                        ? "Your property's address"
                        : userType === "tour"
                        ? "Your office's address"
                        : userType === "guide"
                        ? "Your address"
                        : "Activity operating address"}
                    </label>

                    <input
                      placeholder="Type address..."
                      className="w-full border focus:border-[#5461FD] border-[#e2e2e2] rounded-[5px] px-[15px] py-[10px] mt-[3px] mb-[17px] text-base sm:text-lg font-medium text-[#283456] font-[URW Geometric] focus:outline-none"
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                    />

                    <div className="bg-[#ebf1ff] text-sm font-[500] rounded-sm p-3 w-full">
                      <p className="text-sm text-[#283456]">
                        {userType === "guide"
                          ? "This will not be visible on our profile."
                          : userType === "hotel"
                          ? "We'll embed the map view manually through Google."
                          : "We'll verify the address & embed the map view manually through Google."}
                      </p>
                    </div>
                  </div>

                  {userType === "hotel" && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Select property type
                        </label>
                        <ButtonGroup
                          options={[
                            "Hotel",
                            "Campsite",
                            "Homestay",
                            "Resort",
                            "Lodge",
                            "Hostel",
                            "Apartment",
                            "Guesthouse",
                          ]}
                          value={formData.propertyType}
                          onChange={(value) =>
                            updateFormData("propertyType", value as string)
                          }
                        />
                      </div>

                      <FileUpload
                        label="Upload photos"
                        subText="You can upload up to 5 photos"
                        multiple
                        files={formData.photos}
                        onChange={(files) => {
                          if (files) {
                            updateFormData("photos", Array.from(files));
                          }
                        }}
                      />
                    </>
                  )}

                  {userType === "tour" && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          What type of tours do you operate?
                        </label>
                        <ButtonGroup
                          options={[
                            "Day tours",
                            "Multi-day tours",
                            "Group tours",
                            "City tours",
                          ]}
                          value={formData.tourTypes}
                          onChange={(value) =>
                            updateFormData("tourTypes", value)
                          }
                          multiple
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Do you operate treks?
                        </label>
                        <ButtonGroup
                          options={["Yes", "No"]}
                          value={formData.operatesTreks}
                          onChange={(value) =>
                            updateFormData("operatesTreks", value as string)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Do you cater to International tourists?
                        </label>
                        <ButtonGroup
                          options={["Yes", "No"]}
                          value={formData.internationalTourists}
                          onChange={(value) =>
                            updateFormData(
                              "internationalTourists",
                              value as string
                            )
                          }
                        />
                      </div>
                    </>
                  )}

                  {userType === "activity" && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Activity
                        </label>
                        <ButtonGroup
                          options={activities}
                          value={formData.activity}
                          onChange={(value) =>
                            updateFormData("activity", value)
                          }
                          multiple
                        />
                      </div>

                      <input
                        placeholder="Type activity"
                        className="w-full border border-[#e2e2e2] rounded-[5px] px-[15px] py-[10px] mt-[3px] mb-[17px] text-base sm:text-lg font-medium text-[#283456] font-[URW Geometric] focus:outline-none"
                      />

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Working Days
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                          <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                          <span className="text-slate-700 font-medium">
                            Monday to Sunday (Except Fridays)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Working hours
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                            <Clock className="w-5 h-5 mr-2 text-gray-500" />
                            <span className="text-slate-700 font-medium">
                              17:00
                            </span>
                          </div>
                          <span className="text-slate-600">to</span>
                          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                            <Clock className="w-5 h-5 mr-2 text-gray-500" />
                            <span className="text-slate-700 font-medium">
                              Anytime
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {userType === "rental" && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Select rental type
                        </label>
                        <ButtonGroup
                          options={["Car rental", "Bike rental"]}
                          value={formData.rentalType}
                          onChange={(value) =>
                            updateFormData("rentalType", value as string)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          How many cars do you have?
                        </label>
                        <ButtonGroup
                          options={["1-5", "6-10", "11-20", "20+"]}
                          value={formData.vehicleCount}
                          onChange={(value) =>
                            updateFormData("vehicleCount", value as string)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Do you offer self-drive options?
                        </label>
                        <ButtonGroup
                          options={["Yes", "No"]}
                          value={formData.selfDrive}
                          onChange={(value) =>
                            updateFormData("selfDrive", value as string)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Do you require safety deposit from customers?
                        </label>
                        <ButtonGroup
                          options={["Yes", "No"]}
                          value={formData.safetyDeposit}
                          onChange={(value) =>
                            updateFormData("safetyDeposit", value as string)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Working Days
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                          <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                          <span className="text-slate-700 font-medium">
                            Monday to Sunday (Except Fridays)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Working hours
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                            <Clock className="w-5 h-5 mr-2 text-gray-500" />
                            <span className="text-slate-700 font-medium">
                              17:00
                            </span>
                          </div>
                          <span className="text-slate-600">to</span>
                          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                            <Clock className="w-5 h-5 mr-2 text-gray-500" />
                            <span className="text-slate-700 font-medium">
                              Anytime
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {userType === "guide" && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          What is your speciality?
                        </label>
                        <ButtonGroup
                          options={specialties}
                          value={formData.specialty}
                          onChange={(value) =>
                            updateFormData("specialty", value)
                          }
                          multiple
                        />
                      </div>

                      <DropdownSelect
                        label="Year since you've been working as a guide?"
                        options={[
                          "1-2 years",
                          "3-5 years",
                          "6-10 years",
                          "10+ years",
                        ]}
                        value={formData.experience}
                        onChange={(value) =>
                          updateFormData("experience", value)
                        }
                      />

                      <div className="space-y-2">
                        <label className="block text-slate-700 text-lg font-semibold">
                          Do you cater to International tourists?
                        </label>
                        <ButtonGroup
                          options={["Yes", "No"]}
                          value={formData.internationalTourists}
                          onChange={(value) =>
                            updateFormData(
                              "internationalTourists",
                              value as string
                            )
                          }
                        />
                      </div>

                      <FileUpload
                        label="Upload photos"
                        subText="You can upload up to 5 photos"
                        multiple
                        files={formData.photos}
                        onChange={(files) => {
                          if (files) {
                            updateFormData("photos", Array.from(files));
                          }
                        }}
                      />
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Services/Additional Details Step */}
            {currentStep === 3 && userType === "hotel" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-700 text-center">
                  About your services
                </h2>

                <div className="space-y-4">
                  <MultiSelect
                    label="Amenities at your property"
                    options={amenitiesList}
                    value={formData.amenities}
                    onChange={(value) => updateFormData("amenities", value)}
                  />

                  <div className="space-y-2">
                    <label className="block text-slate-700 text-lg font-semibold">
                      How many rooms does your property have?
                    </label>
                    <ButtonGroup
                      options={["1-5", "6-15", "16-25", "26-40", "40+"]}
                      value={formData.rooms}
                      onChange={(value) =>
                        updateFormData("rooms", value as string)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-700 text-lg font-semibold">
                      Check-in time
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                        <Clock className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-slate-700 font-medium">
                          17:00
                        </span>
                      </div>
                      <span className="text-slate-600">to</span>
                      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                        <Clock className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-slate-700 font-medium">
                          Anytime
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-700 text-lg font-semibold">
                      Check-out time
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 w-fit">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span className="text-slate-700 font-medium">11:00</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Verification Step */}
            {((currentStep === 4 && userType === "hotel") ||
              (currentStep === 3 &&
                ["tour", "activity", "rental", "guide"].includes(
                  userType
                ))) && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-700 text-center">
                  For verification
                </h2>

                <div className="space-y-6">
                  {userType === "hotel" && (
                    <div>
                      <p className="text-lg font-semibold mb-4 text-slate-700">
                        Upload any official document that confirms you are the
                        rightful owner or authorized manager of this property
                      </p>
                      <FileUpload
                        label=""
                        subText="You can upload upto 2 files"
                        multiple
                        files={formData.documents}
                        onChange={(files) => {
                          if (files) {
                            updateFormData("documents", Array.from(files));
                          }
                        }}
                      />
                    </div>
                  )}

                  {userType === "tour" && (
                    <>
                      <div>
                        <p className="text-lg font-semibold mb-4 text-slate-700">
                          We need your business registration document to prove
                          you're the rightful owner of this business.
                        </p>
                        <FileUpload
                          label=""
                          subText="Max. file size: 5 MB"
                          files={formData.documents}
                          onChange={(files) => {
                            if (files) {
                              updateFormData("documents", Array.from(files));
                            }
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-4 text-slate-700">
                          We need your DTS License to prove you're registered
                          with the department of tourism services.
                        </p>
                        <FileUpload
                          label=""
                          subText="Max. file size: 5 MB"
                          files={[]}
                          onChange={() => {}}
                        />
                      </div>
                    </>
                  )}

                  {userType === "activity" && (
                    <>
                      <div>
                        <p className="text-lg font-semibold mb-4 text-slate-700">
                          Please upload any official document that verifies your
                          eligibility to operate this activity.
                        </p>
                        <FileUpload
                          label=""
                          subText="Max. file size: 5 MB"
                          files={formData.documents}
                          onChange={(files) => {
                            if (files) {
                              updateFormData("documents", Array.from(files));
                            }
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-4 text-slate-700">
                          Upload any official document that confirms you are the
                          rightful owner or authorized manager of this business.
                        </p>
                        <FileUpload
                          label=""
                          subText="Max. file size: 5 MB"
                          files={[]}
                          onChange={() => {}}
                        />
                      </div>
                    </>
                  )}

                  {userType === "rental" && (
                    <div>
                      <p className="text-lg font-semibold mb-4 text-slate-700">
                        Upload any official document that confirms you are the
                        rightful owner or authorized manager of this property
                      </p>
                      <FileUpload
                        label=""
                        subText="You can upload upto 2 files"
                        multiple
                        files={formData.documents}
                        onChange={(files) => {
                          if (files) {
                            updateFormData("documents", Array.from(files));
                          }
                        }}
                      />
                    </div>
                  )}

                  {userType === "guide" && (
                    <>
                      <div>
                        <p className="text-lg font-semibold mb-4 text-slate-700">
                          Please upload your CNIC photo so we can verify your
                          identity. It will be stored safely in our database.
                        </p>
                        <FileUpload
                          label=""
                          subText="Max. file size: 5 MB"
                          files={formData.documents}
                          onChange={(files) => {
                            if (files) {
                              updateFormData("documents", Array.from(files));
                            }
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-4 text-slate-700">
                          We need your DTS License to prove you're registered
                          with the department of tourism services.
                        </p>
                        <FileUpload
                          label=""
                          subText="Max. file size: 5 MB"
                          files={[]}
                          onChange={() => {}}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Finish"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
