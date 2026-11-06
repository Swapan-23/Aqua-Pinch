"""
AQUA PINCH: Computational Pinch Analysis Engine
Calculates mass balance intervals, limiting composite curves, 
and minimum freshwater targets for industrial water networks.
"""

def run_water_pinch_analysis():
    # Process stream input data
    operations = [
        {"op": 1, "mass": 3.0, "cin": 0, "cout": 200, "flow": 15.0},
        {"op": 2, "mass": 5.0, "cin": 60, "cout": 200, "flow": 35.7},
        {"op": 3, "mass": 25.0, "cin": 60, "cout": 400, "flow": 73.53},
        {"op": 4, "mass": 6.0, "cin": 500, "cout": 800, "flow": 20.0}
    ]

    conc_intervals = [0, 60, 200, 400, 500, 800]
    cum_mass = 0.0
    max_target_flow = 0.0
    pinch_conc = 0
    cum_mass_list = [0.0]
    target_flows = [0.0]

    for i in range(len(conc_intervals) - 1):
        c_low = conc_intervals[i]
        c_high = conc_intervals[i + 1]
        delta_c = c_high - c_low

        active_flow = 0.0
        for op in operations:
            if op["cin"] <= c_low and op["cout"] >= c_high:
                active_flow += op["flow"]

        interval_mass = (active_flow * delta_c) / 1000.0
        cum_mass += interval_mass
        cum_mass_list.append(cum_mass)

        target_flow = (cum_mass * 1000.0) / c_high
        target_flows.append(target_flow)

        if target_flow > max_target_flow:
            max_target_flow = target_flow
            pinch_conc = c_high

    result = {
        "min_freshwater_requirement_t_hr": round(max_target_flow, 2),
        "pinch_concentration_ppm": pinch_conc,
        "concentration_intervals": conc_intervals,
        "cumulative_mass_kg_hr": [round(m, 3) for m in cum_mass_list],
        "target_flows_t_hr": [round(f, 2) for f in target_flows],
        "operations_data": operations
    }

    print("--- WATER PINCH ANALYSIS RESULTS ---")
    print(f"Minimum Freshwater Target: {result['min_freshwater_requirement_t_hr']} t/hr")
    print(f"Pinch Concentration: {result['pinch_concentration_ppm']} ppm")
    
    return result

if __name__ == "__main__":
    run_water_pinch_analysis()
